import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonInput, IonIcon, IonButton, IonItem } from '@ionic/angular/standalone';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonInput, IonIcon, IonButton, IonItem, ReactiveFormsModule]
})
export class SigninComponent implements OnInit {
  credentialsForm!: FormGroup;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.credentialsForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login(){
    if (this.credentialsForm.valid) {
      const { email, password } = this.credentialsForm.value;      
      this.authService.login(email, password);
      this.credentialsForm.reset();
    } else {
      console.log("Formulario no válido");
      
    }
    // this.router.navigateByUrl('/tabs', { replaceUrl: true });
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
