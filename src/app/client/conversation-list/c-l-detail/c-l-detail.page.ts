import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonNote, IonFooter, IonInput, IonButton, IonIcon } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { ConversationService } from '../../../services/conversation.service';
import { Conversation } from '../../../models/conversation.model';
import { addIcons } from 'ionicons';
import { send, settingsOutline } from 'ionicons/icons';
import { ChatService } from '../../../services/chat.service';

@Component({
  selector: 'app-c-l-detail',
  templateUrl: './c-l-detail.page.html',
  styleUrls: ['./c-l-detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonNote, IonFooter, IonInput, IonButton, IonIcon]
})
export class CLDetailPage implements OnInit {

  workerId: any = null;  // ID del trabajador
  client_id = localStorage.getItem("userID");  // ID del cliente con quien estás chateando
  current_chat_id: any = null;
  current_chat_data: any[] = [];
  messages: any[] = [];
  newMessage: string = '';

  conversation: Conversation;
  constructor(
    private route: ActivatedRoute, private chatService: ChatService
  ) { 
    addIcons({ send, settingsOutline });
  }

  ngOnInit() {
    this.current_chat_id = this.route.snapshot.paramMap.get("id");
    this.getChatData(this.current_chat_id);
}

async getChatData(chatId: any){
  try {
    const data = await this.chatService.getChatData(chatId);      
    this.current_chat_data = data;
    this.workerId = this.current_chat_data[0].workerId;

    this.chatService.createOrGetChat(this.client_id, this.workerId).then(chatId => {
      this.chatService.listenToChatMessages(chatId, (messages: any) => {
        this.messages = messages;
        console.log("this.messages", messages);
        
      });
    });
    console.log("data", this.current_chat_data);
    // console.log("current_categorie", this.current_client_activity);
    
  } catch(error) {
    console.error("Error fetching chat by ID:", error);
  }
}

async sendMessage() {
  if (this.newMessage.trim()) {
    // Añadir el mensaje al chat
    await this.chatService.startChatAndSendMessage(this.client_id, this.workerId, this.newMessage, true);
    this.newMessage = ''; // Limpiar el input
  }
}

}
