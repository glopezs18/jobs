import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonListHeader, IonThumbnail, IonIcon, IonLabel, IonSkeletonText, IonButton } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../../explore-container/explore-container.component';
import { addIcons } from 'ionicons';
import { musicalNotes, pizza, school, storefront } from 'ionicons/icons';
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
      activity: 'Majadas Once',
      date: '27 jul . 10:52pm',
      cost: 'GTQ33.98',
      icon: 'pizza'
    },
    {
      id: 'a2',
      activity: 'Miraflores',
      date: '27 jul . 7:52pm',
      cost: 'GTQ40.37',
      icon: 'musical-notes'
    },
    {
      id: 'a3',
      activity: 'Metamercado',
      date: '6 jul . 6:28pm',
      cost: 'GTQ41.92',
      icon: 'school'
    },
    {
      id: 'a4',
      activity: 'Rincon del steak',
      date: '16 jun . 6:23pm',
      cost: 'GTQ72.55',
      icon: 'storefront'
    }
  ]

  constructor() {
    addIcons({ musicalNotes, pizza, school, storefront });
   }

  ngOnInit() {
  }


}
