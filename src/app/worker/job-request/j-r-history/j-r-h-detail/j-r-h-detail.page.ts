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
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonBadge
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-j-r-h-detail',
  templateUrl: './j-r-h-detail.page.html',
  styleUrls: ['./j-r-h-detail.page.scss'],
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
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonBadge
  ]
})
export class JRHDetailPage implements OnInit {

  job: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      if (params && params.job) {
        this.job = JSON.parse(params.job);
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
