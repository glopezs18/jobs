import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonItem,
  IonLabel,
  IonBadge,
  IonButton
} from '@ionic/angular/standalone';
import { RestWorkerService } from '../../services/rest.worker.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonGrid,
    IonItem,
    IonLabel,
    IonBadge,
    IonButton
  ]
})
export class HomePage implements OnInit {

  totalRequests: number;
  completedJobs: number;
  totalIncome: number;
  clientFeedbacks: number;

  incomeData: any[];
  jobCategoryData: any[];

  current_worker_join_services: any[] = [];

  constructor(private restService: RestWorkerService ) {
    // Inicializar los datos del resumen de actividad
    this.totalRequests = 0;  // Ejemplo de solicitudes de trabajo recibidas
    this.completedJobs = 0;  // Ejemplo de trabajos completados
    this.totalIncome = 0;   // Ejemplo de ingresos generados
    this.clientFeedbacks = 8; // Ejemplo de comentarios recibidos


    // Datos para gráficos de estadísticas
    this.incomeData = [
      { month: 'January', income: 100 },
      { month: 'February', income: 150 },
      { month: 'March', income: 250 },
      // Agrega más meses según sea necesario
    ];

    this.jobCategoryData = [
      { category: 'Carpentry', jobs: 4 },
      { category: 'Electricity', jobs: 3 },
      { category: 'Plumbing', jobs: 3 },
      // Agrega más categorías según sea necesario
    ];
  }

  ngOnInit() {
    // Lógica adicional al inicializar el componente, si es necesario
    this.get_worker_activity_service_by_idworker(localStorage.getItem('userID'));
  }

  // Métodos para manejar la lógica del Dashboard

  async get_worker_activity_service_by_idworker(_wc_id: any) {

    try {
      const data = await this.restService.get_total_worker_activity_service_by_idworker(_wc_id);      
      // for (let index = 0; index < data.length; index++) {
      //   data[index].show_buttons = this.active_buttons(data[index].date_services);
      // }
      this.current_worker_join_services = data;      
      this.totalRequests = this.current_worker_join_services.length;
      for (let index = 0; index < this.current_worker_join_services.length; index++) {
        const request_service = this.current_worker_join_services[index];
        if (request_service.status == 3) {
          this.completedJobs = this.completedJobs + 1;
          this.totalIncome += parseInt(request_service.cost, 10); 
        }
      }
      console.log("current_worker_join_services", this.current_worker_join_services);

    } catch (error) {
      console.error("Error fetching category by ID:", error);
    }

  }

  getTotalRequests() {
    return this.totalRequests;
  }

  getCompletedJobs() {
    return this.completedJobs;
  }

  getTotalIncome() {
    return this.totalIncome;
  }

  getClientFeedbacks() {
    return this.clientFeedbacks;
  }

  getIncomeData() {
    return this.incomeData;
  }

  getJobCategoryData() {
    return this.jobCategoryData;
  }

  // Métodos para visualizar ingresos por categoría y trabajos realizados por mes
  viewCategoryIncome() {
    // Aquí podrías navegar a una vista que muestre un desglose de ingresos por categoría de trabajo
    console.log("Navegando a Ingresos por Categoría...");
  }

  viewMonthlyJobs() {
    // Aquí podrías navegar a una vista que muestre un gráfico o listado de trabajos realizados por mes
    console.log("Navegando a Trabajos Realizados por Mes...");
  }

}
