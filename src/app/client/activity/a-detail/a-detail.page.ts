import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonRow, IonCol, IonLabel, IonIcon, IonThumbnail, IonItem, IonText, IonList, IonBadge, ActionSheetController, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  personCircle,
  locationOutline,
  readerOutline
} from 'ionicons/icons';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from "@angular/router";
import { RestService } from '../../../services/rest.service';
import { StaticElement } from '../../../services/static.element';

@Component({
  selector: 'app-a-detail',
  templateUrl: './a-detail.page.html',
  styleUrls: ['./a-detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonRow, IonCol, IonLabel, IonIcon, IonThumbnail, IonItem, IonText, IonList, IonBadge, IonButton]
})
export class ADetailPage implements OnInit {

  request: any;
  current_activity_id: any = null;
  current_client_activity: any = null;
  state: Array<any> = [];

  constructor(
    private route: ActivatedRoute,
    private restService: RestService,
    public actionSheetCtrl: ActionSheetController,
    private navCtrl: NavController,
  ) { 
    addIcons({ personCircle, locationOutline, readerOutline })
  }

  ngOnInit() {
    this.current_activity_id = this.route.snapshot.paramMap.get("id");
    this.init_static();
    this.get_worker_activity_service_by_id(this.current_activity_id);
  }

  init_static() {
    this.state = StaticElement.state_activity;
  }

  get_state_name(_id: any): object {
    return this.state.find(obj => obj.id == _id)?.name;
  };
  get_state_color(_id: any): object {
    return this.state.find(obj => obj.id == _id)?.color;
  };

  async get_worker_activity_service_by_id(_wjs_id: any) {       
    
    try {
      const data = await this.restService.get_worker_activity_service_by_id(_wjs_id);
      this.current_client_activity = data[0];
      // console.log("current_categorie", this.current_client_activity);
      
    } catch(error) {
      console.error("Error fetching category by ID:", error);
    }
    
  }

  async presentActionSheet(_item: any) {
    let actionSheet = await this.actionSheetCtrl.create({ //Llamamos a la función create para contruir nuestro componente.
      header: "Cambiar estado de solicitud", //El título de nuestro ActionSheet
      //Este array define los botones que van a ir dentro de nuestro contenedor     
      buttons: this.active_buttons(_item) ? [{
        text: 'Cancelar solicitud de servicio',
        icon: 'trash-outline',
        role: 'destructive',
        handler: () => {                  
          console.log('cancel service clicked ' + _item.id);  
          this.update_worker_activity_service(2);          
        }
      }] : [{
        text: 'Marcar servicio como completado',          
        icon: 'create-outline',
        handler: () => {
          console.log('complete service clicked ' + _item.id); 
          this.update_worker_activity_service(3);           
        }
      },
      {
        text: 'Cancelar solicitud de servicio',
        icon: 'trash-outline',
        role: 'destructive',
        handler: () => {                  
          console.log('cancel service clicked ' + _item.id);    
          this.update_worker_activity_service(2); 
        }
      }] 
    });
 
    await actionSheet.present(); //Esta es la función que llama al ActionSheet para que sea mostrado.
  }

  async update_worker_activity_service(status: any) {
    console.log("status", status);
    console.log("current_client_activity old", this.current_client_activity);
    this.current_client_activity.status = status;
    console.log("current_client_activity new", this.current_client_activity);
    
  }

  convertTimestampToDate(firebaseTimestamp: any): string {
    const date = new Date(firebaseTimestamp.seconds * 1000); // Convertir segundos a milisegundos
    return date.toISOString().substring(0, 10); // Formato YYYY-MM-DD
  }

  active_buttons(_item: any): boolean {    
    let date_service = new Date(this.convertTimestampToDate(_item?.date_services));
    let today = new Date();
  
    return today < date_service;
  }

  async acceptRequest() {
    console.log('Solicitud aceptada:', this.request);
    try {
      await this.restService.update_worker_activity_service({status: 1}, this.current_activity_id);            
      this.navCtrl.navigateBack('client/activity');
      // this.router.navigateByUrl('/worker/job-request', { replaceUrl: true });
      
    } catch (error) {
      console.error("Error fetching category by ID:", error);
    }
    // Lógica para aceptar la solicitud
    // const data = await this.restService.update_worker_activity_service(_ws_id);
    
    // this.navCtrl.navigateBack('worker/job-request');
  }

  async rejectRequest() {
    console.log('Solicitud rechazada:', this.request);
    try {
      await this.restService.update_worker_activity_service({status: 2}, this.current_activity_id);            
      this.navCtrl.navigateBack('client/activity');
    } catch (error) {
      console.error("Error fetching category by ID:", error);
    }
    // Lógica para rechazar la solicitud
    // this.navCtrl.navigateBack('worker/job-request');
  }
}
