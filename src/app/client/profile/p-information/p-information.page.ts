import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonNavLink, IonButtons, IonBackButton, IonList, IonItem, IonInput, IonText, IonButton, IonSelect, IonSelectOption, IonInputPasswordToggle, IonToast } from '@ionic/angular/standalone';
import { RestService } from '../../../services/rest.service'
import { StaticElement } from '../../../services/static.element';
import { Timestamp } from 'firebase/firestore';
import { AlertController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { 
  checkmarkCircle,
  closeCircle
} from 'ionicons/icons';

@Component({
  selector: 'app-p-information',
  templateUrl: './p-information.page.html',
  styleUrls: ['./p-information.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonNavLink, IonButtons, IonBackButton, IonList, IonItem, IonInput, IonText, IonButton, IonSelect, IonSelectOption, IonInputPasswordToggle, ReactiveFormsModule, IonToast]
})
export class PInformationPage implements OnInit {
  
  form: FormGroup;

  gender_select: Array<any> = [];
  isToastOpen = false;
  toastMsg: string;
  toastIcon: string

  constructor(
    private builder: FormBuilder,
    private restService: RestService
  ) { 
    addIcons({ checkmarkCircle, closeCircle });
  }

  ngOnInit(): void {
    this.get_client_profile(localStorage.getItem('userID'));
    this.init_static();
    this.form = this.builder.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      tel: [null, Validators.required],
      birthday: [null, Validators.required],
      gender: [null, Validators.required],
      password: [null, Validators.required],
    });    
  }

  init_static() {
    //gender_select
    this.gender_select = StaticElement.gender_select;
  }

  async get_client_profile(_c_id: any) {
    const data = await this.restService.get_client_profile(_c_id);    
    
    this.form.controls['name'].setValue(data[0]?.name);    
    this.form.controls['email'].setValue(data[0]?.email);    
    this.form.controls['tel'].setValue(data[0]?.phone);    
    this.form.controls['birthday'].setValue(this.convertTimestampToDate(data[0]?.birthday));             
    this.form.controls['gender'].setValue(data[0]?.gender);                
    this.form.controls['password'].setValue(data[0]?.password);    
  }

  async update_profile() {
    if (this.form.valid) {
      const date = new Date(this.form.controls['birthday'].value);
      const timestamp = Timestamp.fromDate(date);
      this.form.controls['birthday'].setValue(timestamp);      
      
      try {
        await this.restService.update_client_profile(this.form.value, localStorage.getItem('userID'));
        this.get_client_profile(localStorage.getItem('userID'));
        this.toastMsg = "Tus datos se actualizaron correctamente.";
        this.toastIcon = "checkmark-circle";
        this.setOpenToast(true);
      } catch(error) {
        this.toastMsg = "Hubo un problema al actualizar tus datos. Inténtalo más tarde.";
        this.toastIcon = "close-circle";
        this.setOpenToast(true);
      }
    }
  }

  convertTimestampToDate(firebaseTimestamp: any): string {
    const date = new Date(firebaseTimestamp.seconds * 1000); // Convertir segundos a milisegundos
    return date.toISOString().substring(0, 10); // Formato YYYY-MM-DD
  }

  setOpenToast(isOpen: boolean) {        
    this.isToastOpen = isOpen;
  }
}
