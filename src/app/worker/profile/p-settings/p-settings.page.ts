import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonToggle, IonLabel, IonSelect, IonSelectOption, IonButton, IonItem, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from '../../../services/authentication.service';
import { ProfileWorkerService } from '../../../services/profile-worker.service'
import { addIcons } from "ionicons";

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

  currentUserId: any = localStorage.getItem('userID');
  profile: any = null;

  constructor(
    private alertController: AlertController, 
    private authService: AuthenticationService,
    private profileService: ProfileWorkerService
  ) {}
  ngOnInit() {
    this.get_worker_profile(this.currentUserId);
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
            if (data.currentPassword === this.profile.password) {
              if (data.newPassword === data.confirmPassword) {
                this.updatePassword(data.newPassword);
              } else {
                this.showAlert('Error', 'Las contraseñas no coinciden.');
              }
            } else {
              this.showAlert('Error', 'La contraseña actual es incorrecta.');
            }
            
          },
        },
      ],
    });

    await alert.present();
  }

  async updatePassword(_newPassword: string) {
    // Lógica para cambiar la contraseña
    console.log('Contraseña actualizada:', _newPassword);
    try {
      const newPassword = _newPassword;
      await this.authService.reauthenticateUser(this.profile.email, this.profile.password);
      await this.authService.changePassword(newPassword);
      try {
        await this.profileService.update_worker_profile({password: _newPassword}, this.currentUserId);
      } catch (error) {
        console.log("error", error);
        
      }
      this.showAlert('Listo', 'Contraseña cambiada exitosamente');
    } catch (error: any) {
      this.showAlert('Error', 'Error al cambiar la contraseña: ' + error.message);      
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async get_worker_profile(_w_id: any) {
    const data = await this.profileService.get_worker_profile(_w_id);
    this.profile = data[0];    
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
