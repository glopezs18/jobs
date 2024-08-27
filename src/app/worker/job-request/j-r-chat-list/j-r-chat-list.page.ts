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
  IonBackButton
} from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';

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
    IonBackButton
  ]
})
export class JRChatListPage implements OnInit {

  chatList: Chat[] = [
    {
      id: 1,
      clientName: 'Juan Pérez',
      clientAvatar: 'https://cdn-icons-png.flaticon.com/512/5951/5951752.png',
      lastMessage: 'Hola, estoy interesado en tu servicio...',
      unreadCount: 2,
    },
    {
      id: 2,
      clientName: 'María López',
      clientAvatar: 'https://cdn-icons-png.flaticon.com/512/5951/5951752.png',
      lastMessage: '¿Puedes hacer el trabajo el viernes?',
      unreadCount: 0,
    },
    // Más chats...
  ];

  constructor(private navCtrl: NavController) { }

  ngOnInit() { }

  openChat(chat: Chat) {
    this.navCtrl.navigateForward(`worker/job-request/j-r-chat-list/j-r-chat-detail`, {
      queryParams: { chatId: chat.id }
    });
  }

}
