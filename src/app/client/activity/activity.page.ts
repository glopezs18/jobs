import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonListHeader, IonThumbnail, IonIcon, IonLabel, IonSkeletonText, IonButton } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../../explore-container/explore-container.component';
import { addIcons } from 'ionicons';
import { musicalNotes, pizza, school, storefront, hammerOutline, libraryOutline, pawOutline, constructOutline } from 'ionicons/icons';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonList, IonItem, IonListHeader, IonThumbnail, IonIcon, IonLabel, IonSkeletonText, IonButton]
})
export class ActivityPage implements OnInit {
  public loaded = false;

  recent_activity = [
    {
      id: 'a1',
      activity: 'Instalación de cableado',
      date: '27 jul . 10:52pm',
      cost: 'GTQ500.08',
      icon: 'hammer-outline'
    },
    {
      id: 'a2',
      activity: 'Clases de refuerzo',
      date: '27 jul . 7:52pm',
      cost: 'GTQ40.37',
      icon: 'library-outline'
    },
    {
      id: 'a3',
      activity: 'Consulta de veterinario',
      date: '6 jul . 6:28pm',
      cost: 'GTQ41.92',
      icon: 'paw-outline'
    },
    {
      id: 'a4',
      activity: 'Reparación de puerta',
      date: '16 jun . 6:23pm',
      cost: 'GTQ350.00',
      icon: 'construct-outline'
    }
  ]

  constructor() {
    addIcons({ musicalNotes, pizza, school, storefront, hammerOutline, libraryOutline, pawOutline, constructOutline });
   }

  ngOnInit() {

    if (this.recent_activity.length > 0) {
      this.loaded = true;
    }
  }


}
