import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonNavLink, IonButtons, IonBackButton, IonItem, IonLabel, IonIcon, IonText, IonNote, IonList, ActionSheetController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  trashOutline,
  homeOutline,
  createOutline,
  ellipsisVertical,
  locationOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-p-location',
  templateUrl: './p-location.page.html',
  styleUrls: ['./p-location.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonNavLink, IonButtons, IonBackButton, IonItem, IonLabel, IonIcon, IonText, IonNote, IonList]
})
export class PLocationPage implements OnInit {

  // actionSheetCtrl: any;
  constructor(
    public actionSheetCtrl: ActionSheetController,
  ) { 
    addIcons({ trashOutline, homeOutline, createOutline, ellipsisVertical, locationOutline });
  }

  ngOnInit() {
  }

  async presentActionSheet(_id: any, _header: any) {
    let actionSheet = await this.actionSheetCtrl.create({ //Llamamos a la función create para contruir nuestro componente.
      header: _header, //El título de nuestro ActionSheet
      //Este array define los botones que van a ir dentro de nuestro contenedor
      buttons: [
        {
          text: 'Usar como dirección de entrega',
          icon: 'home-outline',
          handler: () => {
            console.log('Use location clicked ' + _id);
          }
        },
        {
          text: 'Editar dirección',
          icon: 'create-outline',
          handler: () => {
            console.log('Edit location clicked ' + _id);
          }
        },
        {
          text: 'Eliminar dirección',
          icon: 'trash-outline',
          role: 'destructive',
          handler: () => {
            console.log('Delete location clicked ' + _id);
          }
        }
      ]
    });
 
    await actionSheet.present(); //Esta es la función que llama al ActionSheet para que sea mostrado.
  }

}
