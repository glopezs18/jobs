import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonInput, IonIcon, IonButton, IonItem } from '@ionic/angular/standalone';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonInput, IonIcon, IonButton, IonItem, ReactiveFormsModule]
})
export class SignupComponent implements OnInit {
  registerForm!: FormGroup;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: [null, [Validators.required, Validators.email]],
      lastname: [null, [Validators.required, Validators.email]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      repeat_password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  register(){
    console.log("register");
    // this.router.navigateByUrl('/tabs', { replaceUrl: true });
  }

  navigateToSignIn() {
    this.router.navigate(['/signin']);
  }

}
