import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
    allContacts: [],
    chats: [],
    messages: [],
    activeTab: "chats",
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

    toggleSound: () => {
        localStorage.setItem("isSoundEnabled", !get().isSoundEnabled)
        set({ isSoundEnabled: !get().isSoundEnabled })
    },

    setActiveTab: (tab) => set({ activeTab: tab }),
    setSelectedUser: (user) => set({ selectedUser: user }),

    getAllContacts: async () => {
        set({ isUsersLoading: true })

        try {
            const res = await axiosInstance.get("/messages/contacts")
            set({ allContacts: res.data.data })
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong")
        } finally {
            set({ isUsersLoading: false })
        }
    },

    getMyChatPartners: async () => {
        set({ isUsersLoading: true })

        try {
            const res = await axiosInstance.get("/messages/chats")
            set({ chats: res.data.data })
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong")
        } finally {
            set({ isUsersLoading: false })
        }
    },

    getMessagesByUserId: async (userId) => {
        set({ isMessagesLoading: true })

        try {
            const res = await axiosInstance.get(`/messages/${userId}`)
            set({ messages: res.data.data })
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong!")
        } finally {
            set({ isMessagesLoading: false })
        }
    },

    sendMessage: async (data) => {
        const { selectedUser } = get();
        if (!selectedUser?._id) return toast.error("No user selected");

        const { authUser } = useAuthStore.getState();
        if (selectedUser._id === authUser?._id) {
            return toast.error("You cannot send messages to yourself");
        }

        const tempId = `temp-${Date.now()}`;

        // Safely extract values based on whether payload is FormData or raw object
        const isForm = data instanceof FormData;
        const textValue = isForm ? data.get("text") : data.text;
        const imageValue = isForm ? data.get("image") : data.image;

        const optimisticMessage = {
            _id: tempId,
            senderId: authUser._id,
            receiverId: selectedUser._id,
            text: textValue || "",
            // If it's a file, turn it into a blob URL for previewing, otherwise use directly
            image: imageValue instanceof File ? URL.createObjectURL(imageValue) : (typeof imageValue === "string" ? imageValue : null),
            createdAt: new Date().toISOString(),
            isOptimistic: true,
        };

        // Immediately update the UI by adding the optimistic message
        set((state) => ({ messages: [...state.messages, optimisticMessage] }));
        
        try {
            // Build FormData payload to ensure proper multipart transmission
            let payload = data;
            if (!isForm) {
                payload = new FormData();
                if (textValue) payload.append("text", textValue);
                if (imageValue instanceof File) payload.append("image", imageValue);
            }

            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, payload, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            // Replace optimistic message in place with server response
            set((state) => ({
                messages: state.messages.map((msg) => msg._id === tempId ? res.data.data : msg)
            }));
        } catch (error) {
            // Remove optimistic message on failure
            set((state) => ({
                messages: state.messages.filter((msg) => msg._id !== tempId)
            }));
            toast.error(error.response?.data?.message || "Something went wrong!")
        }
    },

    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        if (!socket) return;

        // Clean up any existing listeners first to avoid double triggers
        socket.off("newMessage");

        socket.on("newMessage", (newMessage) => {
            const currentSelectedUser = get().selectedUser;
            const isMessageSentFromSelectedUser = newMessage.senderId === currentSelectedUser?._id;
            if (!isMessageSentFromSelectedUser) return;

            set((state) => ({ messages: [...state.messages, newMessage] }));

            if (get().isSoundEnabled) {
                const notificationSound = new Audio("/sounds/notification.mp3");

                notificationSound.currentTime = 0; // reset to start
                notificationSound.play().catch((e) => console.log("Audio play failed:", e));
            }
        });
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        
        if (socket) {
            socket.off("newMessage");
        }
    },
}));