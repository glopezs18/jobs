import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonNote, IonFooter, IonInput, IonButton, IonIcon } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { ConversationService } from '../../../services/conversation.service';
import { Conversation } from '../../../models/conversation.model';
import { addIcons } from 'ionicons';
import { send } from 'ionicons/icons';

@Component({
  selector: 'app-c-l-detail',
  templateUrl: './c-l-detail.page.html',
  styleUrls: ['./c-l-detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonNote, IonFooter, IonInput, IonButton, IonIcon]
})
export class CLDetailPage implements OnInit {
  conversation: Conversation;
  messages: { text: string; sender: string; timestamp: Date }[] = [];
  newMessage: string = '';
  constructor(
    private route: ActivatedRoute,
    private conversationService: ConversationService
  ) { 
    addIcons({ send });
  }

  ngOnInit() {
    const conversationId = this.route.snapshot.paramMap.get('id');

    if (conversationId) {
      const conversation = this.conversationService.getConversationById(conversationId);

      if (conversation) {
        this.conversation = conversation;
        this.messages = [
          { text: 'Hey, how are you?', sender: this.conversation.title, timestamp: new Date() },
          { text: 'I am good, thanks! And you?', sender: 'Me', timestamp: new Date() },
          { text: 'See you tomorrow', sender: this.conversation.title, timestamp: new Date() },
          { text: 'Ok, thank you!', sender: 'Me', timestamp: new Date() },
        ];
      } else {
        console.error('Conversation not found');
        // Aquí puedes redirigir al usuario a una página de error o mostrar un mensaje
      }
    } else {
      console.error('No conversation ID provided');
      // Maneja el caso en que no se proporciona un ID
    }  
}

sendMessage() {
  if (this.newMessage.trim() === '') {
    return;
  }

  this.messages.push({
    text: this.newMessage,
    sender: 'Me',
    timestamp: new Date()
  });

  // Lógica para enviar el mensaje al servidor, si aplica
  this.newMessage = '';
}

}
