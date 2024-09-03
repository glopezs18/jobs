import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonListHeader, IonThumbnail, IonIcon, IonLabel, IonSkeletonText, IonButton, IonBadge } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../../explore-container/explore-container.component';
import { addIcons } from 'ionicons';
import { musicalNotes, pizza, school, storefront, hammerOutline, libraryOutline, pawOutline, constructOutline } from 'ionicons/icons';
import {RouterModule} from '@angular/router';

import { StaticElement } from '../../services/static.element';
import { RestService } from '../../services/rest.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonList, IonItem, IonListHeader, IonThumbnail, IonIcon, IonLabel, IonSkeletonText, IonButton, IonBadge]
})
export class ActivityPage implements OnInit {
  public loaded = true;
  state: Array<any> = [];

  current_worker_join_services: any[] = [];

  recent_activity = [
    {
      id: 'a1',
      activity: 'Instalación de cableado',
      date: '27 jul . 10:52pm',
      cost: 'GTQ500.08',
      state: 0,
      icon: 'hammer-outline'
    },
    {
      id: 'a2',
      activity: 'Clases de refuerzo',
      date: '27 jul . 7:52pm',
      cost: 'GTQ40.37',
      state: 1,
      icon: 'library-outline'
    },
    {
      id: 'a3',
      activity: 'Consulta de veterinario',
      date: '6 jul . 6:28pm',
      cost: 'GTQ41.92',
      state: 2,
      icon: 'paw-outline'
    },
    {
      id: 'a4',
      activity: 'Reparación de puerta',
      date: '16 jun . 6:23pm',
      cost: 'GTQ350.00',
      state: 3,
      icon: 'construct-outline'
    }
  ]

  constructor(
    private restService: RestService
  ) {
    addIcons({ musicalNotes, pizza, school, storefront, hammerOutline, libraryOutline, pawOutline, constructOutline });
   }

  ngOnInit() {          
    this.init_static();
    this.get_worker_activity_service_by_idclient(localStorage.getItem('userID'));
    setTimeout(() => {
      if (this.current_worker_join_services.length > 0) {
        this.loaded = false;
      }
    }, 1500);
  }

  init_static() {
    this.state = StaticElement.state_activity;
  }

  get_state_name(_id: any): object {
    return this.state.find(obj => obj.id == _id)?.name;
  };
  get_state_color(_id: any): object {
    return this.state.find(obj => obj.id == _id)?.color;
  };

  async get_worker_activity_service_by_idclient(_wc_id: any) {       
    
    try {
      const data = await this.restService.get_worker_activity_service_by_idclient(_wc_id);
      this.current_worker_join_services = data;
      console.log("current_worker_join_services", this.current_worker_join_services);
      
    } catch(error) {
      console.error("Error fetching category by ID:", error);
    }
    
  }

}
