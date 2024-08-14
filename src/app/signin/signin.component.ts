import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonInput, IonIcon, IonButton, IonItem } from '@ionic/angular/standalone';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonInput, IonIcon, IonButton, IonItem, ReactiveFormsModule]
})
export class SigninComponent implements OnInit {
  credentials!: FormGroup;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['eve.holt@reqres.in', [Validators.required, Validators.email]],
      password: ['cityslicka', [Validators.required, Validators.minLength(6)]],
    });
  }

  login(){
    console.log("login");
    this.router.navigateByUrl('/tabs', { replaceUrl: true });
  }
  login_client(){
    console.log("login client");
    this.router.navigateByUrl('/client', { replaceUrl: true });
  }
  login_worker(){
    console.log("login worker");
    this.router.navigateByUrl('/worker', { replaceUrl: true });
  }

  navigateToSignUp() {
    this.router.navigate(['/signup']);
  }
}
