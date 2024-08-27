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
  IonIcon,
  IonBadge
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronForwardOutline } from 'ionicons/icons';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-j-r-history',
  templateUrl: './j-r-history.page.html',
  styleUrls: ['./j-r-history.page.scss'],
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
    IonIcon,
    IonBadge
  ]
})
export class JRHistoryPage implements OnInit {
  jobHistory = [
    {
      serviceName: 'Reparación de Tubería',
      clientName: 'Juan Pérez',
      date: new Date('2024-08-20'),
      status: 'Completado'
    },
    {
      serviceName: 'Instalación Eléctrica',
      clientName: 'María Gómez',
      date: new Date('2024-08-18'),
      status: 'Cancelado'
    }
    // Otros trabajos
  ];

  constructor(private navController: NavController) {
    addIcons({ chevronForwardOutline });
  }
  ngOnInit() { }

  viewJobDetail(job: any) {
    this.navController.navigateForward('worker/job-request/j-r-history/j-r-h-detail', {
      queryParams: {
        job: JSON.stringify(job)
      }
    });
  }

  getBadgeColor(status: string): string {
    switch (status) {
      case 'Completado':
        return 'success';
      case 'Cancelado':
        return 'danger';
      case 'Pendiente':
        return 'warning';
      default:
        return 'medium'; // Color gris por defecto para otros estados
    }
  }
}
