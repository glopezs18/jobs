import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonRow,
  IonCol,
  IonLabel,
  IonIcon,
  IonText,
  IonButton,
  IonActionSheet,
  IonItem,
  IonList,
  IonNavLink,
  IonAvatar
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { ProfileService } from '../../services/profile-client.service'
import { addIcons } from "ionicons";
import { personCircle, settingsOutline, logOutOutline, locationOutline } from "ionicons/icons";
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'; // Plugin de cámara

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonRow, IonCol, IonLabel, IonIcon, IonText, IonButton, IonActionSheet, IonItem, IonList, IonNavLink, IonAvatar]
})
export class ProfilePage implements OnInit {

  data_profile: any = null;
  selectedFile: File | null = null;
  profilePictureUrl: string = '';
  currentUserId: any = localStorage.getItem('userID');
  public actionSheetButtons = [
    {
      text: 'Tomar una foto',
      icon: 'camera-outline',
      handler: () => {
        console.log('Take a picture');
        this.takePicture(CameraSource.Camera); 
      },
    },
    {
      text: 'Elegir de la galería',
      icon: 'image-outline',
      handler: () => {
        console.log('choose a picture');
        this.takePicture(CameraSource.Photos);
      },
    },
    {
      text: 'Eliminar foto',
      role: 'destructive',
      icon: 'trash-outline',
      handler: () => {
        console.log('delete a picture');
        this.removeProfilePicture();
      },
    },
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];
  constructor(
    private router: Router,
    private profileService: ProfileService,
    private authService: AuthenticationService
  ) {
    addIcons({ settingsOutline, locationOutline, logOutOutline });
  }

  ngOnInit() {
    this.get_profile_picture(localStorage.getItem('userID'));
    // this.loadProfilePicture();
  }

  async get_profile_picture(_client_id: any) {
    try {
      const data = await this.profileService.getProfilePicture(_client_id);
      this.data_profile = data;

      console.log(this.data_profile);

    } catch (error) {
      console.error("Error fetching category by ID:", error);
    }
  }


  // Tomar una foto o elegir de la galería
  async takePicture(source: CameraSource) {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: source
    });

    // Verificamos si image.dataUrl no es undefined
    if (image.dataUrl) {
      const blob = this.dataUrlToBlob(image.dataUrl); // Convertir a Blob para subir
      await this.uploadProfilePicture(blob); // Subimos la imagen
    } else {
      console.error('Error: image dataUrl is undefined');
    }
  }

  // Convertir Data URL a Blob (para subir a Firebase)
  dataUrlToBlob(dataUrl: string): Blob {
    const byteString = atob(dataUrl.split(',')[1]); // Convierte base64 a binario
    const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0]; // Obtiene el tipo MIME

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  }

  // Subir la imagen seleccionada
  async uploadProfilePicture(blob: Blob) {
    try {
      // Convertimos el Blob a File. Le damos un nombre al archivo, como "profile-picture.jpg".
      const file = new File([blob], 'profile-picture.jpg', { type: 'image/jpeg' });

      // Ahora subimos el archivo usando el servicio creado
      const downloadURL = await this.profileService.uploadProfilePicture(file, this.currentUserId);

      // Actualizamos la URL en el perfil del usuario
      await this.profileService.updateUserProfilePicture(this.currentUserId, downloadURL);

      // Mostramos la nueva imagen en el perfil
      this.profilePictureUrl = downloadURL;

      console.log("Profile picture uploaded successfully!");
    } catch (error) {
      console.error("Error uploading profile picture: ", error);
    }
  }

  // Eliminar la foto de perfil (puedes implementar eliminar el archivo de Firebase si lo deseas)
  async removeProfilePicture() {
    this.profilePictureUrl = 'assets/img/default-avatar.png'; // Imagen por defecto
    await this.profileService.updateUserProfilePicture(this.currentUserId, this.profilePictureUrl);
  }

  navigateToPInformation() {
    this.router.navigateByUrl('/client/profile/p-information', { replaceUrl: true });
  }

  navigateToPLocations() {
    this.router.navigateByUrl('/client/profile/p-location', { replaceUrl: true });
  }

  logout() {
    this.authService.logout();
  }

}
