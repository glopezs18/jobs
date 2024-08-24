import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonBadge, IonNote, IonAvatar } from '@ionic/angular/standalone';
import { ConversationService } from '../../services/conversation.service';
import { Conversation } from '../../models/conversation.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.page.html',
  styleUrls: ['./conversation-list.page.scss'],
  standalone: true,
  imports: [RouterModule, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonLabel, IonBadge, IonNote, IonAvatar]
})
export class ConversationListPage implements OnInit {
  conversations: Conversation[];
  constructor(private conversationService: ConversationService) {}

  ngOnInit() {
    this.conversations = this.conversationService.getConversations();
  }

  trackByFn(index: number, conversation: Conversation): string {
    return conversation.id;
  }

}
