import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonList, IonItem, IonLabel, IonInput, IonIcon, IonAvatar, IonButton, IonSelect, IonSelectOption, IonButtons, IonTextarea } from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { settingsOutline } from 'ionicons/icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [RouterModule, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonList, IonItem, IonLabel, IonInput, IonIcon, IonAvatar, IonButton, IonSelect, IonSelectOption, IonButtons, IonTextarea]
})
export class ProfilePage implements OnInit {
  profilePhotoUrl: string | undefined;

  profile = {
    photo: 'https://c7.alamy.com/comp/2G104M8/electrician-avatar-man-working-with-electricity-profile-user-person-people-icon-isolated-vector-illustration-2G104M8.jpg',
    name: 'John Doe',
    email: 'johndoe@example.com',
    description: 'prueba',
    rate: '',
    categories: ['Electricista', 'Plomería']
  };

  availableCategories = ['Electricista', 'Plomería', 'Carpintería', 'Mecánica', 'Jardinería'];

  constructor(private router: Router, private alertController: AlertController) {
    addIcons({ settingsOutline });
  }

  ngOnInit() {
  }

  async uploadPhoto() {
    if (this.isMobile()) { // Verifica si estamos en un entorno móvil
      try {
        const image = await Camera.getPhoto({
          quality: 100,
          source: CameraSource.Prompt,
          resultType: CameraResultType.DataUrl,
        });

        this.profilePhotoUrl = image.dataUrl;
      } catch (error) {
        console.error('Error uploading photo', error);
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'No se pudo subir la foto.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    } else {
      this.selectPhotoFromGallery();
    }
  }

  selectPhotoFromGallery() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.style.display = 'none';

    input.addEventListener('change', (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.profilePhotoUrl = e.target?.result as string;
        };
        reader.readAsDataURL(file);
      }
    });

    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  }

  saveProfile() {
    console.log('Perfil guardado', this.profile);
    // Aquí puedes agregar la lógica para guardar el perfil, por ejemplo, en un servicio.
  }

  goToSettings() {
    this.router.navigate(['/settings']);
  }

  isMobile(): boolean {
    // Simple check to determine if the device is mobile
    return /Mobi|Android/i.test(navigator.userAgent);
  }
}
