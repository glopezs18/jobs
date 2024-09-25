import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonList, IonItem, IonLabel, IonInput, IonIcon, IonAvatar, IonButton, IonSelect, IonSelectOption, IonButtons, IonTextarea, IonRow, IonCol, IonToast, IonActionSheet } from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { settingsOutline, logOutOutline, cameraOutline, imageOutline, trashOutline } from 'ionicons/icons';
import { AuthenticationService } from '../../services/authentication.service';
import { ProfileWorkerService } from '../../services/profile-worker.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [RouterModule, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonList, IonItem, IonLabel, IonInput, IonIcon, IonAvatar, IonButton, IonSelect, IonSelectOption, IonButtons, IonTextarea, IonRow, IonCol, ReactiveFormsModule, IonToast, IonActionSheet]
})
export class ProfilePage implements OnInit {
  profilePhotoUrl: string | undefined;

  form: FormGroup;
  profile: any = null;
  isToastOpen = false;
  toastMsg: string;
  toastIcon: string
  toastColor: string;

  data_profile: any = null;
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

  availableCategories: any = [];
  // availableCategories = ['Electricista', 'Plomería', 'Limpieza', 'Mecánica', 'Jardinería'];

  constructor(
    private router: Router,
    private alertController: AlertController,
    private authService: AuthenticationService,
    private profileService: ProfileWorkerService,
    private builder: FormBuilder
  ) {
    addIcons({ settingsOutline, logOutOutline, cameraOutline, imageOutline, trashOutline });
  }

  ngOnInit() {
    this.get_worker_categories();
    this.get_worker_profile(localStorage.getItem('userID'));
    this.get_profile_picture(localStorage.getItem('userID'))

    this.form = this.builder.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      phone: [null, Validators.required],
      categories: [null, Validators.required],
      dpi: [null, Validators.required],
      about_me: [null, Validators.required]
    });
  }

  async get_worker_profile(_w_id: any) {
    const data = await this.profileService.get_worker_profile(_w_id);
    this.profile = data[0];

    this.form.controls['name'].setValue(this.profile?.name);
    this.form.controls['email'].setValue(this.profile?.email);
    this.form.controls['phone'].setValue(this.profile?.phone);
    this.form.controls['dpi'].setValue(this.profile?.dpi);
    this.form.controls['about_me'].setValue(this.profile?.about_me);
    this.form.controls['categories'].setValue(this.profile?.categories);
    // console.log("data", data);

  }

  async get_worker_categories() {
    const data = await this.profileService.get_worker_categories();
    try {
      for (let index = 0; index < data.length; index++) {
        this.availableCategories.push(data[index]?.name);

      }
    } catch (error) {

    }


    console.log(this.availableCategories);

  }

  async get_profile_picture(_user_id: any) {
    try {
      const data = await this.profileService.getProfilePicture(_user_id);
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
      this.data_profile = downloadURL;

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

  async saveProfile() {
    if (this.form.valid) {
      console.log(this.form.value);

      try {
        await this.profileService.update_worker_profile(this.form.value, localStorage.getItem('userID'));
        this.toastMsg = "Tus datos se actualizaron correctamente.";
        this.toastIcon = "checkmark-circle";
        this.toastColor = "success";
        this.setOpenToast(true);
      } catch (error) {
        console.log(error);
        this.toastMsg = "Hubo un problema al actualizar tus datos. Inténtalo más tarde.";
        this.toastIcon = "close-circle";
        this.toastColor = "danger";
        this.setOpenToast(true);
      }
    }

  }

  setOpenToast(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  goToSettings() {
    this.router.navigate(['/settings']);
  }

  logout() {
    this.authService.logout();
  }

  isMobile(): boolean {
    // Simple check to determine if the device is mobile
    return /Mobi|Android/i.test(navigator.userAgent);
  }
}
