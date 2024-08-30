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
  IonNavLink
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../../explore-container/explore-container.component';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonRow, IonCol, IonLabel, IonIcon, IonText, IonButton, IonActionSheet, IonItem, IonList, IonNavLink, ExploreContainerComponent]
})
export class ProfilePage implements OnInit {

  public actionSheetButtons = [
    {
      text: 'Tomar una foto',
      icon: 'camera-outline',
      handler: () => {  
        console.log('Take a picture');  
      },
    },
    {
      text: 'Elegir de la galería',
      icon: 'image-outline',
      handler: () => {  
        console.log('choose a picture');  
      },
    },
    {
      text: 'Eliminar foto',
      role: 'destructive',
      icon: 'trash-outline',
      handler: () => {  
        console.log('delete a picture');  
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
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  navigateToPInformation(){
    this.router.navigateByUrl('/client/profile/p-information', { replaceUrl: true });
  }

  navigateToPLocations(){
    this.router.navigateByUrl('/client/profile/p-location', { replaceUrl: true });
  }

  logout(){
    this.authService.logout();
  }

}
