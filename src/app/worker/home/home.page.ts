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

  constructor() {
    // Inicializar los datos del resumen de actividad
    this.totalRequests = 15;  // Ejemplo de solicitudes de trabajo recibidas
    this.completedJobs = 10;  // Ejemplo de trabajos completados
    this.totalIncome = 500;   // Ejemplo de ingresos generados
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
  }

  // Métodos para manejar la lógica del Dashboard

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
