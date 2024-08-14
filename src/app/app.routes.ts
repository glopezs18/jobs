import { Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/signin',
    pathMatch: 'full',
  },
  {
    path: 'signin',
    component: SigninComponent
    // loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'signup',
    component: SignupComponent
    // loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'worker',    
    loadChildren: () => import('./worker/worker.routes').then((m) => m.routes)
  },
  {
    path: 'client',    
    loadChildren: () => import('./client/client.routes').then((m) => m.routes)
  }
];
