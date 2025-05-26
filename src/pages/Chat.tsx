import React from "react";
import ChatList from "../components/chat/ChatList";
import ChatWindow from "../components/chat/ChatWindow";

const Chat: React.FC = () => {
  return (
    <div className="container mx-auto p-4 h-screen">
      <div className="flex h-full gap-4">
        <div className="w-1/3">
          <ChatList />
        </div>
        <div className="w-2/3">
          <ChatWindow />
        </div>
      </div>
    </div>
  );
};

export default Chat;
