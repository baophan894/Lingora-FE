import { io, Socket } from "socket.io-client";
import type { Message } from "../types/chat";
// import { store } from "../store/store";

export const MOCK_TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODMxZjM1MmQ5NDQ5NGEzN2EzYTMwOTMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDgyMjU0MjAsImV4cCI6MTc0ODIyOTAyMH0.Jf1Ujky-6nWpiFjKpNiVQFVNxDeysCm0fU9k5ir3C8MYO3WPFp1GA5MBtYraAZ6dwYXPwGA6_-FE2JAbVZ_vFbpin0ckypiFPp8NN6_67Mcy1sNfo5xBczS2CSghQouIXW2JQAD63AWae7ixaOeaiXVjBxUn-5_egt3PES6WNMPdXe44yNbcQkOicFdMYbZXtOo362BX4EdShFGhF7TdktAQVpLavbsRpDXB11b7-4UECwCaYDAb8NaIJnD-chNt7U-4CGi7Y2TmaDs-9o5eJh7g34tQiWSUhtCFStD8eKgBr9BsO4RZbjZ6bAFd70K-qmRs5yWnHWQ3OmDYlM-3IQ"

class SocketService {
  private socket: Socket | null = null;
  // private token: string | null = null;

  connect() {
    if (this.socket?.connected) return;

    // const state = store.getState();
    // this.token = state.auth.token;

    // if (!this.token) {
    //   console.error("No authentication token available");
    //   return;
    // }

    this.socket = io("http://localhost:4000/chat", {
      auth: {
        token: MOCK_TOKEN,
      },
    });

    this.socket.on("connect", () => {
      console.log("Connected to chat server");
    });

    this.socket.on("disconnect", () => {
      console.log("Disconnected from chat server");
    });

    this.socket.on("error", (error) => {
      console.error("Socket error:", error);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  sendMessage(chatId: string, content: string) {
    if (!this.socket?.connected) {
      console.error("Socket not connected");
      return;
    }

    this.socket.emit("sendMessage", {
      chatId,
      message: { content },
    });
  }

  markAsRead(chatId: string) {
    if (!this.socket?.connected) {
      console.error("Socket not connected");
      return;
    }

    this.socket.emit("markAsRead", chatId);
  }

  onNewMessage(callback: (message: Message) => void) {
    this.socket?.on("newMessage", callback);
  }

  onMessageSent(callback: (message: Message) => void) {
    this.socket?.on("messageSent", callback);
  }

  onMessagesRead(callback: (data: { chatId: string }) => void) {
    this.socket?.on("messagesRead", callback);
  }

  removeListeners() {
    this.socket?.removeAllListeners();
  }
}

export const socketService = new SocketService();
