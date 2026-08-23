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
    
            toast.success("Messages fetched successfully!")
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong!")
        } finally {
            set({ isMessagesLoading: false })
        }
    },

    sendMessage: async (data) => {
        const { selectedUser, messages } = get()
        if (!selectedUser?._id) return toast.error("No user selected");

        const { authUser } = useAuthStore.getState()

        const tempId = `temp-${Date.now()}`;

        const optimisticMessage = {
            _id: tempId,
            senderId: authUser._id,
            receiverId: selectedUser._id,
            text: messageData.text,
            image: messageData.image,
            createdAt: new Date().toISOString(),
            isOptimistic: true, // Flag to identify optimistic messages (optional)
        };
        // Immediately update the UI by adding the message
        set({ messages: [...messages, optimisticMessage] });
        
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, data, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            set({ messages: messages.concat(res.data.data) }) 
        } catch (error) {
            // Remove optimistic message on failure
            set({ messages: messages });
            toast.error(error.response?.data?.message || "Something went wrong!")
        }
    },

    subscribeToMessages: () => {
        const { selectedUser, isSoundEnabled } = get();
        if (!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        socket.on("newMessage", (newMessage) => {
        const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
        if (!isMessageSentFromSelectedUser) return;

        const currentMessages = get().messages;
        set({ messages: [...currentMessages, newMessage] });

        if (isSoundEnabled) {
            const notificationSound = new Audio("/sounds/notification.mp3");

            notificationSound.currentTime = 0; // reset to start
            notificationSound.play().catch((e) => console.log("Audio play failed:", e));
        }
        });
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },
}));