import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonListHeader,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonButtons,
  IonButton,
  IonInput,
  IonIcon,
  IonBadge  
} from '@ionic/angular/standalone';
import { AlertController, NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { briefcaseOutline, chatbubblesOutline } from 'ionicons/icons';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-job-request',
  templateUrl: './job-request.page.html',
  styleUrls: ['./job-request.page.scss'],
  standalone: true,
  imports: [
    RouterModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonListHeader,
    IonItem,
    IonItemDivider,
    IonLabel,
    IonButtons,
    IonButton,
    IonInput,
    IonIcon,
    IonBadge
  ]
})
export class JobRequestPage implements OnInit {

  jobRequests = [
    {
      id: 1,
      client: 'Juan Pérez',
      service: 'Carpintería',
      date: new Date(),
      status: 'Pendiente',
      description: 'Necesito reparar una puerta.',
      address: 'Calle Falsa 123',
      price: 50
    },
    {
      id: 2,
      client: 'María García',
      service: 'Electricidad',
      date: new Date(),
      status: 'Pendiente',
      description: 'Instalación de lámparas.',
      address: 'Avenida Siempre Viva 742',
      price: 75
    }
  ];

  constructor(private alertController: AlertController, private navCtrl: NavController) {
    addIcons({ briefcaseOutline, chatbubblesOutline });
  }

  ngOnInit() {
  }


  viewRequestDetails(_request: any) {
    // console.log("request", _request);
    
    this.navCtrl.navigateForward('worker/job-request/j-r-detail', {
      queryParams: {
        request: JSON.stringify(_request)
      }
    });
  }

  getBadgeColor(status: string): string {
    switch (status) {
      case 'Pendiente':
        return 'warning';
      case 'Aceptada':
        return 'success';
      case 'Rechazada':
        return 'danger';
      default:
        return 'medium';
    }
  }

  // Navegar al historial de trabajos
  goToJobHistory() {
    this.navCtrl.navigateForward('worker/job-request/j-r-history');
  }

  // Navegar a la vista de chats
  goToChats() {
    this.navCtrl.navigateForward('worker/job-request/j-r-chat-list');
  }

}
