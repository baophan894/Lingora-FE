import { io, Socket } from "socket.io-client";
import type { Message } from "../types/chat";
import { store } from "../store/store";


class SocketService {
  private socket: Socket | null = null;
  private token: string | null = null;

  connect() {
    if (this.socket?.connected) return;

    const state = store.getState();
    this.token = state.auth.token;

    if (!this.token) {
      console.error("No authentication token available");
      return;
    }

    this.socket = io("http://localhost:4000/chat", {
      auth: {
        token: this.token,
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
