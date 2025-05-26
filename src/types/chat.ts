export interface Message {
  _id: string;
  sender: string;
  content: string;
  chat: string;
  createdAt: string;
  updatedAt: string;
}

export interface Chat {
  id: string;
  participant1: {
    id: string;
    fullName: string;
    avatarUrl: string;
  };
  participant2: {
    id: string;
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
