import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setCurrentChat } from "../../features/chat/chatSlice";
import { fetchChats } from "../../features/chat/chatThunk";
import type { Chat } from "../../types/chat";
import type { RootState } from "../../store/store";
import { socketService } from "../../services/socket.service";
import defaultAvatar from "../../assets/ic_avatar.jpg";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const ChatList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentChat, chats, loading } = useAppSelector(
    (state: RootState) => state.chat
  );
  const auth = useAppSelector((state: RootState) => state.auth);
  const currentUser = auth.user;

  const [searchTerm, setSearchTerm] = useState("");

  console.log("------------------------------------------------------");
  console.log("User trong trang chat:", JSON.stringify(auth.user, null, 2));

  // const currentUser = {
  //   id: "6831f35d29449a37a3a3093", 
  //   fullName: "Mock User",
  // };

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
  };

  const handleChatSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredChats = chats.filter((chat: Chat) => {
    const otherUser =
      chat.participant1._id === currentUser?._id
        ? chat.participant2
        : chat.participant1;
    return otherUser.fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (loading) {
    return <div className="p-4">Loading chats...</div>;
  }

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold mb-2">Chats</h2>
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-600" />         
          <input
            type="text"
            placeholder="Tìm kiếm theo tên..."
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-4xl text-sm focus:outline-none focus:ring focus:ring-blue-300"
            value={searchTerm}
            onChange={handleChatSearch}
          />
        </div>
      </div>

      <div className="divide-y">
        {filteredChats.length === 0 && (
          <div className="p-4">No chats found</div>
        )}
        {filteredChats.map((chat: Chat) => {
          const otherUser =
            chat.participant1._id === currentUser?._id
              ? chat.participant2
              : chat.participant1;

          return (
            <div
              key={chat._id}
              className={`p-4 cursor-pointer border-gray-200 hover:bg-gray-50 ${
                currentChat?._id === chat._id ? "bg-gray-100" : ""
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
                  <h3 className="font-medium text-start">
                    {otherUser.fullName}
                  </h3>
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
