import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonNavLink, IonButtons, IonBackButton, IonItem, IonLabel, IonIcon, IonText, IonNote, IonList, ActionSheetController, IonFab, IonFabButton, IonModal, IonButton, IonInput, IonToast } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  trashOutline,
  homeOutline,
  createOutline,
  ellipsisVertical,
  locationOutline,
  add,
  checkmarkCircle,
  closeCircle
} from 'ionicons/icons';

import { OverlayEventDetail } from '@ionic/core/components';
import { RestService } from '../../../services/rest.service'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-p-location',
  templateUrl: './p-location.page.html',
  styleUrls: ['./p-location.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonNavLink, IonButtons, IonBackButton, IonItem, IonLabel, IonIcon, IonText, IonNote, IonList, IonFab, IonFabButton, IonModal, IonButton, IonInput, IonToast]
})
export class PLocationPage implements OnInit {
  @ViewChild(IonModal) modal_location: IonModal;
  // actionSheetCtrl: any;
  id_location: string;
  name: string;
  address: string;
  description: string;
  locations: any = null;
  current_client_id = localStorage.getItem('userID');
  isToastOpen = false;
  toastMsg: string;
  toastIcon: string

  isModalOpen = false;
  isUpdate = false;

  dataLocation = {
    address: '',
    name: '',
    description: '',
    client_id: null
  };

  constructor(
    public actionSheetCtrl: ActionSheetController,
    private restService: RestService,
    private alertController: AlertController
  ) { 
    addIcons({ trashOutline, homeOutline, createOutline, ellipsisVertical, locationOutline, add, checkmarkCircle, closeCircle });
  }

  ngOnInit() {
    this.get_client_locations(localStorage.getItem('userID'));
  }

  async presentActionSheet(_item: any) {
    let actionSheet = await this.actionSheetCtrl.create({ //Llamamos a la función create para contruir nuestro componente.
      header: _item.name, //El título de nuestro ActionSheet
      //Este array define los botones que van a ir dentro de nuestro contenedor
      buttons: [        
        {
          text: 'Editar dirección',
          icon: 'create-outline',
          handler: () => {
            // console.log('Edit location clicked ' + _item.id);
            this.setOpenModal(true, _item.id)
          }
        },
        {
          text: 'Eliminar dirección',
          icon: 'trash-outline',
          role: 'destructive',
          handler: () => {
            console.log('Delete location clicked ' + _item.id);
          }
        }
      ]
    });
 
    await actionSheet.present(); //Esta es la función que llama al ActionSheet para que sea mostrado.
  }

  async get_client_locations(_client_id: any) {
    try {
      const data = await this.restService.get_client_locations(_client_id);
      this.locations = data;            
    } catch(error) {
      console.error("Error fetching category by ID:", error);
    }
  }

  async get_client_location_by_id(_location_id: any) {
    const data = await this.restService.get_client_location_by_id(_location_id);
    console.log("data", data);
    
    this.id_location = data[0].id;
    this.name = data[0].name;
    this.address = data[0].address;
    this.description = data[0].description;
  }

  async create_client_location() {
    this.dataLocation.name = this.name;
    this.dataLocation.address = this.address;
    this.dataLocation.description = this.description;
    try {
      const result = await this.restService.create_client_location(this.dataLocation, this.current_client_id);        
      if (result) {
        this.get_client_locations(localStorage.getItem('userID')); // Refresca la lista
        this.modal_location.dismiss(null, 'confirm');
        this.toastMsg = "Ubicación agregada correctamente!";
        this.toastIcon = "checkmark-circle";
        this.reset_form();              
      } else {
        console.error("Failed to add location.");
        this.toastMsg = "Hubo un problema al agregar la ubicación. Inténtalo de nuevo.";
        this.toastIcon = "close-circle";
      }
      this.setOpenToast(true);
    } catch(error){
      console.error("Error adding location:", error);
      this.toastIcon = "close-circle";
      this.toastMsg = "Hubo un problema al agregar la ubicación. Inténtalo de nuevo más tarde.";
      this.setOpenToast(true);
    }    
    
  }

  async update_client_location() {
    const location_data = {
      address: this.address,
      name: this.name,
      description: this.description,
      client_id: null
    };

    const locationId = this.id_location;
    console.log("location_data", location_data);
    console.log("locationId", locationId);
    
  }
  

  cancel() {
    this.reset_form();
    this.modal_location.dismiss(null, 'cancel');
    this.isModalOpen = false;
    this.isUpdate = false;
    this.id_location = '';
  }

  confirm(_id_location: any) {    
    console.log(this.name);
    console.log(this.address);
    console.log(this.description);
    console.log(_id_location);   
    if((this.name != undefined && this.name != '') && (this.address !== undefined && this.address != '') && (this.description !== undefined && this.description != '')){
      
      if (_id_location == undefined && _id_location == '') {
        this.create_client_location();                  
      } else {
        this.update_client_location();
        console.log("actualizar ubicación");
      }            
    } else {
      console.log("Debes llenar todos los campos");    
      this.present_alert();
    }    
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      console.log(ev.detail.data);
    }
  }

  onWillDismissLocation(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      console.log(ev.detail.data); 
      // this.create_client_location();
    }
  }

  async present_alert() {
    const alert = await this.alertController.create({
      header: 'Hay campos vacíos',
      message: 'Debes llenar todos los campos para poder agregar una dirección.',
      buttons: ['Entendido'],
    });

    await alert.present();
  }

  reset_form() {
    this.name = '';
    this.address = '';
    this.description = '';
    this.dataLocation = {
      address: '',
      name: '',
      description: '',
      client_id: null
    };
  }

  setOpenToast(isOpen: boolean) {        
    this.isToastOpen = isOpen;
  }

  setOpenModal(isOpen: boolean, _id: any) {    
    if (_id != null) {
      this.isUpdate = true;
      this.get_client_location_by_id(_id);
    }
    this.isModalOpen = isOpen;      
  }
}
