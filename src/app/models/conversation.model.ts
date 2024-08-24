export interface Conversation {
    id: string;
    title: string;
    lastMessage: string;
    timestamp: Date;
    unreadCount: number;
    imageUrl: string;
  }