import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule, ToastController, NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common'; 
import { IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonInput, IonIcon, IonButton, IonItem, IonTabs, IonTabBar, IonTabButton, IonSelect, IonSelectOption, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [CommonModule, IonicModule, IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonInput, IonIcon, IonButton, IonItem, FormsModule, ReactiveFormsModule, IonTabs, IonTabBar, IonTabButton, IonSelect, IonSelectOption, IonGrid, IonRow, IonCol],  
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SignupComponent implements OnInit {
  formType = 1;
  formTypeBool = true;
  client = {
    name: '',
    email: '',
    birthday: '',
    password: '',
    phone: '',
    gender: '',
    type: 2
  };

  worker = {
    name: '',
    dpi: '',
    email: '',
    password: '',
    phone: '',
    birthday: '',
    gender: '',
    type: 1
  };

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log(this.formType);
    
  }

  toggleForm(type: 1 | 2) {        
    this.formType = type;
    this.formTypeBool = (type == 1) ? true : false;
    console.log("this.formType", this.formType);
    
  }

  async registerClient() {    
    
    try {
      const register_client = await this.authService.registerClient(this.client);            
      console.log("register_client",register_client);
      
      this.showToast('Cliente registrado exitosamente');
      this.navCtrl.navigateRoot('/');
    } catch (error) {
      console.error("Error fetching category by ID:", error);
      this.showToast(error);
    }
  }
  
  async registerWorker() {
    try {
      await this.authService.registerWorker(this.worker);            
      this.showToast('Empleado registrado exitosamente');
      this.navCtrl.navigateRoot('/');
    } catch (error) {
      console.error("Error fetching category by ID:", error);
      this.showToast(error);
    }
  }

  async showToast(message: any) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }

  navigateToSign() {
    this.router.navigate(['/signin']);
  }
}
