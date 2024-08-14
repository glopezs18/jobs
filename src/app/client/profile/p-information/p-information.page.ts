import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonNavLink, IonButtons, IonBackButton, IonList, IonItem, IonInput, IonText, IonButton, IonSelect, IonSelectOption, IonInputPasswordToggle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-p-information',
  templateUrl: './p-information.page.html',
  styleUrls: ['./p-information.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonNavLink, IonButtons, IonBackButton, IonList, IonItem, IonInput, IonText, IonButton, IonSelect, IonSelectOption, IonInputPasswordToggle, ReactiveFormsModule]
})
export class PInformationPage implements OnInit {
  
  form: FormGroup;

  constructor(
    private builder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.builder.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      tel: [null, Validators.required],
      birthday: [null, Validators.required],
      gender: [null, Validators.required],
      password: [null, Validators.required],
    });


    this.form.controls['password'].setValue("NeverGonnaGiveYouUp");
  }

}
