import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonCard, 
  IonCardContent, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardSubtitle, 
  IonButtons, 
  IonBackButton,
  IonFooter,
  IonLabel
} from '@ionic/angular/standalone';
import { Swiper } from 'swiper';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-h-worker',
  templateUrl: './h-worker.page.html',
  styleUrls: ['./h-worker.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButtons, IonBackButton, IonFooter, IonLabel],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class HWorkerPage implements OnInit {

  public swiper!: Swiper;
  constructor() { }

  ngOnInit() {
  }

}
