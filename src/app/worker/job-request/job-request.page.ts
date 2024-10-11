import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { StaticElement } from '../../services/static.element';
import { RestWorkerService } from '../../services/rest.worker.service';
import { Subscription } from 'rxjs';

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
export class JobRequestPage implements OnInit{

  current_worker_join_services: any[] = [];
  state: Array<any> = [];
  solicitudesSubscription: Subscription;

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController,
    private restService: RestWorkerService 
  ) {
    addIcons({ briefcaseOutline, chatbubblesOutline });
  }

  ngOnInit() {
    this.init_static();
    this.get_worker_activity_service_by_idworker(localStorage.getItem('userID'));
    this.solicitudesSubscription = this.restService.solicitudesActualizadas$.subscribe(() => {
      this.get_worker_activity_service_by_idworker(localStorage.getItem('userID'));  // Recargar solicitudes cuando se actualicen
    });
  }

  async get_worker_activity_service_by_idworker(_wc_id: any) {

    try {
      const data = await this.restService.get_worker_activity_service_by_idworker(_wc_id);
      // for (let index = 0; index < data.length; index++) {
      //   data[index].show_buttons = this.active_buttons(data[index].date_services);
      // }
      this.current_worker_join_services = data;      
      console.log("current_worker_join_services", this.current_worker_join_services);

    } catch (error) {
      console.error("Error fetching category by ID:", error);
    }

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

  // Navegar al historial de trabajos
  goToJobHistory() {
    this.navCtrl.navigateForward('worker/job-request/j-r-history');
  }

  // Navegar a la vista de chats
  goToChats() {
    this.navCtrl.navigateForward('worker/job-request/j-r-chat-list');
  }

  ngOnDestroy() {
    if (this.solicitudesSubscription) {
      this.solicitudesSubscription.unsubscribe();  // Limpiar la suscripción
    }
  }

}
