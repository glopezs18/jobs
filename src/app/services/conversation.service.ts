import { Injectable } from '@angular/core';
import { Conversation } from '../models/conversation.model';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  private conversations: Conversation[] = [
    {
      id: '1',
      title: 'John Doe',
      lastMessage: 'Hey, how are you?',
      timestamp: new Date(),
      unreadCount: 2,
      imageUrl: 'https://captiontools.com/wp-content/uploads/2017/03/testy3-1.png'
    },
    {
      id: '2',
      title: 'Jane Smith',
      lastMessage: 'See you tomorrow!',
      timestamp: new Date(),
      unreadCount: 0,
      imageUrl: 'https://franchisematch.com/wp-content/uploads/2015/02/john-doe.jpg'
    }
  ];

  constructor() {}

  getConversations(): Conversation[] {
    return this.conversations;
  }

  getConversationById(id: string): Conversation | undefined {
    return this.conversations.find(conv => conv.id === id);
  }
}
