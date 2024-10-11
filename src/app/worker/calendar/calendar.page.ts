import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { CalendarComponent, NgCalendarModule, CalendarMode } from 'ionic2-calendar';

import { RestWorkerService } from '../../services/rest.worker.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonLabel, NgCalendarModule]
})
export class CalendarPage implements OnInit {

  // Variables que usa el calendario
  // calendar = {
  //   mode: 'month',  // Modo de visualización (puede ser 'month', 'week' o 'day')
  //   currentDate: new Date(), // Fecha actual seleccionada
  // };
  mode = "week" as CalendarMode;
  currentDate = new Date();
  eventSource: any = [];  // Fuente de los eventos (se cargan de Firebase)
  selectedEvent: any;  // Evento seleccionado (para mostrar detalles)

  constructor(private workerService: RestWorkerService, private alertCtrl: AlertController) {}

  ngOnInit() {
    // Cargar los servicios agendados del empleado y asignarlos como eventos del calendario
    this.loadScheduledServices();
  }

  // Función para cargar los servicios agendados desde Firebase
  async loadScheduledServices() {
    try {
      const services = await this.workerService.getWorkerScheduledServices(localStorage.getItem('userID'));
      this.eventSource = services.map((service: any) => {
        return {
          title: service.title,  // Título del servicio o evento
          startTime: new Date(service.startTime),  // Hora de inicio del servicio
          endTime: new Date(service.endTime),  // Hora de finalización del servicio
          allDay: false,  // Puede ser true si es un evento de todo el día          
        };
      });
    } catch (error) {
      console.error('Error cargando servicios agendados:', error);
    }
  }

  // Función llamada cuando se selecciona un evento en el calendario
  onEventSelected(event: any) {
    this.selectedEvent = event;
  }

  // Función llamada cuando se selecciona un día/tiempo en el calendario
  onTimeSelected(event: any) {
    console.log('Día seleccionado:', event);
  }

  // Función llamada cuando cambia el título de la vista (mes, semana, día)
  onViewTitleChanged(title: any) {
    console.log('Vista cambiada:', title);
  }

}
