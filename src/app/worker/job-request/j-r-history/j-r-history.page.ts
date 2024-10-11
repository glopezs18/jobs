import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { StaticElement } from '../../../services/static.element';
import { RestWorkerService } from '../../../services/rest.worker.service';
import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-j-r-history',
  templateUrl: './j-r-history.page.html',
  styleUrls: ['./j-r-history.page.scss'],
  standalone: true,
  imports: [
    RouterModule,
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
  solicitudesSubscription: Subscription;
  current_worker_services_history: any = null;
  state: Array<any> = [];

  // jobHistory = [
  //   {
  //     serviceName: 'Reparación de Tubería',
  //     clientName: 'Juan Pérez',
  //     date: new Date('2024-08-20'),
  //     status: 'Completado'
  //   },
  //   {
  //     serviceName: 'Instalación Eléctrica',
  //     clientName: 'María Gómez',
  //     date: new Date('2024-08-18'),
  //     status: 'Cancelado'
  //   }
  //   // Otros trabajos
  // ];

  constructor(private navController: NavController, private restService: RestWorkerService  ) {
    addIcons({});
  }
  ngOnInit() { 
    this.init_static();
    this.get_worker_activity_service_complete_by_idworker(localStorage.getItem('userID'));

    this.solicitudesSubscription = this.restService.solicitudesActualizadas$.subscribe(() => {
      this.get_worker_activity_service_complete_by_idworker(localStorage.getItem('userID'));  // Recargar solicitudes cuando se actualicen
    });
  }

  async get_worker_activity_service_complete_by_idworker(_wc_id: any) {

    try {
      const data = await this.restService.get_worker_activity_service_complete_by_idworker(_wc_id);
      // for (let index = 0; index < data.length; index++) {
      //   data[index].show_buttons = this.active_buttons(data[index].date_services);
      // }
      console.log("data", data);
      
      this.current_worker_services_history = data;      
      // console.log("current_worker_services_history", this.current_worker_services_history);

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

  // viewJobDetail(job: any) {
  //   this.navController.navigateForward('worker/job-request/j-r-history/j-r-h-detail', {
  //     queryParams: {
  //       job: JSON.stringify(job)
  //     }
  //   });
  // }

  // getBadgeColor(status: string): string {
  //   switch (status) {
  //     case 'Completado':
  //       return 'success';
  //     case 'Cancelado':
  //       return 'danger';
  //     case 'Pendiente':
  //       return 'warning';
  //     default:
  //       return 'medium'; // Color gris por defecto para otros estados
  //   }
  // }
}
