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
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonBadge
} from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-j-r-detail',
  templateUrl: './j-r-detail.page.html',
  styleUrls: ['./j-r-detail.page.scss'],
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
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonBadge
  ]
})
export class JRDetailPage implements OnInit {

  request: any;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      if (params.request) {
        this.request = JSON.parse(params.request);
      }
    });
  }

  acceptRequest() {
    console.log('Solicitud aceptada:', this.request);
    // Lógica para aceptar la solicitud
    this.navCtrl.navigateBack('worker/job-request');
  }

  rejectRequest() {
    console.log('Solicitud rechazada:', this.request);
    // Lógica para rechazar la solicitud
    this.navCtrl.navigateBack('worker/job-request');
  }
  
}
