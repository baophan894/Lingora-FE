export interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  content: string;
  chat: string;
  createdAt: string;
  updatedAt: string;
  timestamp: string;
}

export interface Chat {
  _id: string;
  participant1: {
    _id: string;
    fullName: string;
    avatarUrl: string;
  };
  participant2: {
    _id: string;
    fullName: string;
    avatarUrl: string;
  };
  messages: Message[];
  latestMessage?: Message;
  createdAt: string;
  updatedAt: string;
}

export interface ChatState {
  chats: Chat[];
  currentChat: Chat | null;
  loading: boolean;
  error: string | null;
}

export interface CreateChatRequest {
  userId: string;
}

export interface SendMessageRequest {
  content: string;
  chatId: string;
}

export interface FetchMessagesRequest {
  chatId: string;
}
