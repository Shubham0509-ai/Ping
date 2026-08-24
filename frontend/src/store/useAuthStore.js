import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    socket: null,
    onlineUsers: [],

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check")
            set({ authUser: res.data })

            get().connectSocket()
        } catch (error) {
            console.log("Error in authCheck: ", error)
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true })
        
        try {
            const res = await axiosInstance.post("/auth/signup", data)
            set({ authUser: res.data.data })

            toast.success("Account created successfully!")
            get().connectSocket()
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isSigningUp: false })
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true })
        
        try {
            const res = await axiosInstance.post("/auth/login", data)
            set({ authUser: res.data.data })

            toast.success("Logged in successfully!")
            get().connectSocket()
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isLoggingIn: false })
        }
    },

    logout: async () => {
        try {
            const res = await axiosInstance.post("/auth/logout")
            set({ authUser: null })

            toast.success("Logged out successfully!")
            get().disconnectSocket()
        } catch (error) {
            toast.error("Error logging out!")
        }
    },

    updateProfile: async (data) => {
        try {
            const res = await axiosInstance.put("/auth/update-profile", data, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            set({ authUser: res.data.data });

            toast.success("Profile updated successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    },

    connectSocket: () => {
        const { authUser, socket } = get();
        if (!authUser || socket) return;

        const newSocket = io(BASE_URL, {
            withCredentials: true, // This ensures cookies are sent with the connection
        });

        set({ socket: newSocket })

        // Listen for online user events
        newSocket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds })
        });
    },

    disconnectSocket: () => {
        const { socket } = get();
        if (socket) {
            socket.disconnect();
            set({ socket: null, onlineUsers: [] }); // Reset state
        }
    },
}));