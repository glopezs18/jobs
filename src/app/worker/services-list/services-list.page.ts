import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.page.html',
  styleUrls: ['./services-list.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonButton, IonList, IonItem, IonLabel]
})
export class ServicesListPage implements OnInit {

  services = [
    {
      id: 1,
      name: 'Carpintería',
      rate: 20,
      availability: 'Lunes a Viernes',
      description: 'Servicios de carpintería para muebles y reparaciones menores.',
    },
    // Agrega más servicios aquí
  ];

  constructor(private alertController: AlertController) {}

  ngOnInit() {
  }

  async addService() {
    const alert = await this.alertController.create({
      header: 'Agregar Servicio',
      inputs: [
        { name: 'name', placeholder: 'Nombre del Servicio' },
        { name: 'rate', type: 'number', placeholder: 'Tarifa ($)' },
        { name: 'availability', placeholder: 'Disponibilidad' },
        { name: 'description', placeholder: 'Descripción' },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Agregar',
          handler: (data) => {
            this.services.push({
              id: this.services.length + 1,
              name: data.name,
              rate: data.rate,
              availability: data.availability,
              description: data.description,
            });
          },
        },
      ],
    });

    await alert.present();
  }

  async editService(service: any) {
    const alert = await this.alertController.create({
      header: 'Editar Servicio',
      inputs: [
        { name: 'name', value: service.name, placeholder: 'Nombre del Servicio' },
        { name: 'rate', type: 'number', value: service.rate, placeholder: 'Tarifa ($)' },
        { name: 'availability', value: service.availability, placeholder: 'Disponibilidad' },
        { name: 'description', value: service.description, placeholder: 'Descripción' },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (data) => {
            service.name = data.name;
            service.rate = data.rate;
            service.availability = data.availability;
            service.description = data.description;
          },
        },
      ],
    });

    await alert.present();
  }

  async deleteService(service: any) {
    const alert = await this.alertController.create({
      header: 'Eliminar Servicio',
      message: `¿Estás seguro de que quieres eliminar el servicio ${service.name}?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: () => {
            this.services = this.services.filter(s => s.id !== service.id);
          },
        },
      ],
    });

    await alert.present();
  }

  viewServiceDetails(service: any) {
    // Lógica para navegar a la vista de detalles del servicio
    console.log('Ver detalles del servicio:', service);
  }

}
