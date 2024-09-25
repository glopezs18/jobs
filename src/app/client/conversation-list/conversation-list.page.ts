import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonBadge, IonNote, IonAvatar } from '@ionic/angular/standalone';
import { ConversationService } from '../../services/conversation.service';
import { Conversation } from '../../models/conversation.model';
import { RouterModule, Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';

interface Chat {
  id: number;
  clientName: string;
  clientAvatar: string;
  lastMessage: string;
  unreadCount: number;
}

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.page.html',
  styleUrls: ['./conversation-list.page.scss'],
  standalone: true,
  imports: [RouterModule, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonLabel, IonBadge, IonNote, IonAvatar]
})

export class ConversationListPage implements OnInit {
  conversations: Conversation[];

  userId = localStorage.getItem("userID");  // ID del usuario actual (cliente o trabajador)
  chats: any[] = [];
  isClient = true; 
  constructor(private conversationService: ConversationService, private router: Router, private chatService: ChatService) {}

  ngOnInit() {
    // this.conversations = this.conversationService.getConversations();    
    
    this.loadChats(this.userId, this.isClient);
  }

  // trackByFn(index: number, conversation: Conversation): string {
  //   return conversation.id;
  // }

  async loadChats(userId: any, isClient: boolean) {
    try {
      this.chats = await this.chatService.getChatsWithLastMessage(userId, isClient);
      console.log('Chats:', this.chats);
      
    } catch (error) {
      console.error('Error obteniendo chats:', error);
    }
  }

  openChat(chatId: Chat) {
    console.log("hola", chatId);
    
    this.chatService.markAsRead(chatId, this.isClient);
    this.router.navigate(['/client/conversation/c-l-detail', chatId]);
    // this.navCtrl.navigateForward(`worker/job-request/j-r-chat-list/j-r-chat-detail`, {
    //   queryParams: { chatId: chat.id }
    // });
  }

}
