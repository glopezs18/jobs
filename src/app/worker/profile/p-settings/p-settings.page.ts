import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonToggle, IonLabel, IonSelect, IonSelectOption, IonButton, IonItem, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-p-settings',
  templateUrl: './p-settings.page.html',
  styleUrls: ['./p-settings.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonToggle, IonLabel, IonSelect, IonSelectOption, IonButton, IonItem, IonButtons, IonBackButton,]
})
export class PSettingsPage implements OnInit {

  notificationsEnabled: boolean = true;
  emailNotifications: boolean = true;
  smsNotifications: boolean = false;

  constructor(private alertController: AlertController) {}
  ngOnInit() {
  }
  async changePassword() {
    const alert = await this.alertController.create({
      header: 'Cambiar Contraseña',
      inputs: [
        {
          name: 'currentPassword',
          type: 'password',
          placeholder: 'Contraseña Actual',
        },
        {
          name: 'newPassword',
          type: 'password',
          placeholder: 'Nueva Contraseña',
        },
        {
          name: 'confirmPassword',
          type: 'password',
          placeholder: 'Confirmar Nueva Contraseña',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Guardar',
          handler: (data) => {
            if (data.newPassword === data.confirmPassword) {
              this.updatePassword(data.currentPassword, data.newPassword);
            } else {
              this.showAlert('Error', 'Las contraseñas no coinciden.');
            }
          },
        },
      ],
    });

    await alert.present();
  }

  updatePassword(currentPassword: string, newPassword: string) {
    // Lógica para cambiar la contraseña
    console.log('Contraseña actualizada:', currentPassword, newPassword);
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  toggleNotifications() {
    // Lógica para habilitar/deshabilitar notificaciones
    console.log('Notificaciones:', this.notificationsEnabled);
  }

  toggleEmailNotifications() {
    // Lógica para habilitar/deshabilitar notificaciones por email
    console.log('Notificaciones por Email:', this.emailNotifications);
  }

  toggleSMSNotifications() {
    // Lógica para habilitar/deshabilitar notificaciones por SMS
    console.log('Notificaciones por SMS:', this.smsNotifications);
  }

}
