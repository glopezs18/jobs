import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonList,
  IonItem,
  IonLabel,
  IonFooter,
  IonInput,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { addIcons } from 'ionicons';
import { send } from 'ionicons/icons';

interface Message {
  text: string;
  sent: boolean;
  timestamp: Date;
}

@Component({
  selector: 'app-j-r-chat-detail',
  templateUrl: './j-r-chat-detail.page.html',
  styleUrls: ['./j-r-chat-detail.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButtons,
    IonBackButton,
    IonList,
    IonItem,
    IonLabel,
    IonFooter,
    IonInput,
    IonButton,
    IonIcon
  ]
})
export class JRChatDetailPage implements OnInit {

  clientName: string = 'Cliente';
  newMessage: string = '';
  messages: Message[] = [
    {
      text: 'Hola, estoy interesado en tu servicio.',
      sent: false,
      timestamp: new Date(),
    },
    {
      text: 'Claro, ¿cómo puedo ayudarte?',
      sent: true,
      timestamp: new Date(),
    },
    // Más mensajes...
  ];

  constructor(private route: ActivatedRoute) {
    addIcons({ send });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      if (params['chatId']) {
        console.log(params['chatId']);
        
        // Lógica para obtener el nombre del cliente y mensajes
        // clientName = obtenerNombreDelCliente(params['chatId']);
      }
    });
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.messages.push({
        text: this.newMessage,
        sent: true,
        timestamp: new Date(),
      });
      this.newMessage = '';
      // Lógica para enviar el mensaje al servidor
    }
  }
}
