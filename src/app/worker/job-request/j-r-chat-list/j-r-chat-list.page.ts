import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonAvatar,
  IonLabel,
  IonBadge,
  IonButtons,
  IonBackButton,
  IonNote
} from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';
import { ChatService } from '../../../services/chat.service';
import { Router } from '@angular/router';

interface Chat {
  id: number;
  clientName: string;
  clientAvatar: string;
  lastMessage: string;
  unreadCount: number;
}

@Component({
  selector: 'app-j-r-chat-list',
  templateUrl: './j-r-chat-list.page.html',
  styleUrls: ['./j-r-chat-list.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonList,
    IonItem,
    IonAvatar,
    IonLabel,
    IonBadge,
    IonButtons,
    IonBackButton,
    IonNote
  ]
})
export class JRChatListPage implements OnInit {
  userId = localStorage.getItem("userID");  // ID del usuario actual (cliente o trabajador)
  chats: any[] = [];
  isClient = false; 


  constructor(private navCtrl: NavController, private router: Router, private chatService: ChatService) { }

  ngOnInit() { 
    this.loadChats(this.userId, this.isClient);
  }

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
    this.router.navigate(['/worker/job-request/j-r-chat-list/j-r-chat-detail', chatId]);
    // this.navCtrl.navigateForward(`worker/job-request/j-r-chat-list/j-r-chat-detail`, {
    //   queryParams: { chatId: chat.id }
    // });
  }

}
