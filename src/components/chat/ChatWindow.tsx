import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchMessages } from "../../features/chat/chatThunk";
import type { RootState } from "../../store/store";
import type { Message } from "../../types/chat";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { socketService } from "../../services/socket.service";
import defaultAvatar from "../../assets/ic_avatar.jpg";

const ChatWindow: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentChat, loading } = useAppSelector(
    (state: RootState) => state.chat
  );
  const auth = useAppSelector((state: RootState) => state.auth);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentUser = auth.user;

  const otherUser =
    currentChat?.participant1._id === currentUser?._id
      ? currentChat?.participant2
      : currentChat?.participant1;
  
  useEffect(() => {
    if (auth.user) {
      socketService.connect();
    }
  }, [auth.user]);

  useEffect(() => {
    const handleNewMessage = (message: Message) => {
      if (message.chat?.toString?.() === currentChat?._id?.toString()) {
        dispatch({ type: "chat/addMessage", payload: message });
      }
    };
  
    socketService.onNewMessage(handleNewMessage);
    socketService.onMessageSent(handleNewMessage);

    return () => {
      socketService.removeListeners();
    };
  }, [dispatch, currentChat?._id]);

  useEffect(() => {
    if (currentChat) {
      dispatch(fetchMessages({ chatId: currentChat._id }));
      socketService.markAsRead(currentChat._id);
    }
  }, [currentChat?._id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentChat?.messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentChat) return;

    try {
      socketService.sendMessage(currentChat._id, newMessage);
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  if (!currentChat) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <p className="text-gray-500">Select a chat to start messaging</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow border-l border-gray-200">
      <div className="p-4 border-b border-gray-200 flex items-center gap-10">
        <img
          src={otherUser?.avatarUrl || defaultAvatar}
          alt={otherUser?.fullName}
          className="w-10 h-10 rounded-full"
        />
        <h2 className="text-xl font-semibold">{otherUser?.fullName}</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {
        loading ? (
          <div className="text-center">Loading messages...</div>
        ) : (
          currentChat?.messages.map((message: Message) => {
            const isMine = message.senderId === currentUser?._id;
            return (
              <div
                key={message._id}
                className={`flex ${isMine ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    isMine
                      ? "bg-gradient-to-r from-red-800 to-red-400 text-white"
                      : "bg-gray-100 text-black"
                  }`}
                >
                  <p className="text-start">{message.content}</p>
                  <p className="text-xs mt-1 opacity-70 text-end">
                    <span>{new Date(message.timestamp).toLocaleString()}</span>
                  </p>
                </div>
              </div>
            );
          })
        )
        }
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-gradient-to-r from-red-800 to-red-400 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <PaperAirplaneIcon className="h-5 w-5 text-white" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;
