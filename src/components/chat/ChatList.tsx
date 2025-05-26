import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setCurrentChat } from "../../features/chat/chatSlice";
import { fetchChats } from "../../features/chat/chatThunk";
import type { Chat } from "../../types/chat";
import type { RootState } from "../../store/store";
import { socketService } from "../../services/socket.service";
import defaultAvatar from "../../assets/ic_avatar.jpg";

const ChatList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentChat, chats, loading } = useAppSelector(
    (state: RootState) => state.chat
  );

  const currentUser = {
    id: "6831f35d29449a37a3a3093", 
    fullName: "Mock User",
  };

  useEffect(() => {
    dispatch(fetchChats());

    socketService.onNewMessage(() => {
      dispatch(fetchChats());
    });

    return () => {
      socketService.removeListeners();
    };
  }, [dispatch]);

  const handleChatSelect = (chat: Chat) => {
    dispatch(setCurrentChat(chat));
    socketService.markAsRead(chat.id);
  };

  if (loading) {
    return <div className="p-4">Loading chats...</div>;
  }

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Chats</h2>
      </div>
      <div className="divide-y">
        {chats.length === 0 && <div className="p-4">No chats found</div>}
        {chats.map((chat: Chat) => {
          const otherUser =
            chat.participant1.id === currentUser.id
              ? chat.participant2
              : chat.participant1;

          return (
            <div
              key={chat.id}
              className={`p-4 cursor-pointer hover:bg-gray-50 ${
                currentChat?.id === chat.id ? "bg-gray-100" : ""
              }`}
              onClick={() => handleChatSelect(chat)}
            >
              <div className="flex items-center space-x-3">
                <img
                  src={otherUser.avatarUrl || defaultAvatar}
                  alt={otherUser.fullName}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{otherUser.fullName}</h3>
                  {chat.latestMessage && (
                    <p className="text-sm text-gray-500 truncate">
                      {chat.latestMessage.content}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatList;
