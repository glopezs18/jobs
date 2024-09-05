import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonListHeader, IonThumbnail, IonIcon, IonLabel, IonSkeletonText, IonButton, IonBadge, IonItemSliding, IonItemOptions, IonItemOption, IonAlert, AlertController } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../../explore-container/explore-container.component';
import { addIcons } from 'ionicons';
import { musicalNotes, pizza, school, storefront, hammerOutline, libraryOutline, pawOutline, constructOutline } from 'ionicons/icons';
import { RouterModule } from '@angular/router';

import { StaticElement } from '../../services/static.element';
import { RestService } from '../../services/rest.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonList, IonItem, IonListHeader, IonThumbnail, IonIcon, IonLabel, IonSkeletonText, IonButton, IonBadge, IonItemSliding, IonItemOptions, IonItemOption, IonAlert]
})
export class ActivityPage implements OnInit {
  public loaded = true;
  state: Array<any> = [];
  // @ViewChild(IonItemSliding) slide_item: IonItemSliding;

  current_worker_join_services: any[] = [];

  constructor(
    private restService: RestService,
    public alertCtrl: AlertController
  ) {
    addIcons({});
  }

  ngOnInit() {
    this.init_static();
    this.get_worker_activity_service_by_idclient(localStorage.getItem('userID'));

    setTimeout(() => {
      if (this.current_worker_join_services.length > 0) {
        this.loaded = false;
      }
    }, 1500);
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

  async get_worker_activity_service_by_idclient(_wc_id: any) {

    try {
      const data = await this.restService.get_worker_activity_service_by_idclient(_wc_id);
      for (let index = 0; index < data.length; index++) {
        data[index].show_buttons = this.active_buttons(data[index].date_services);
      }
      this.current_worker_join_services = data;
      console.log("current_worker_join_services", this.current_worker_join_services);

    } catch (error) {
      console.error("Error fetching category by ID:", error);
    }

  }

  async update_worker_activity_service(_item: any, _status: any, _index: any) {
    console.log("status", _status);
    console.log("current_client_activity old " + _index, this.current_worker_join_services[_index]);
    this.current_worker_join_services[_index].status = _status;
    console.log("current_client_activity new " + _index, this.current_worker_join_services[_index]);

    try {
      await this.restService.update_worker_activity_service(this.current_worker_join_services[_index], _item.id);            

    } catch (error) {
      console.error("Error fetching category by ID:", error);
    }
  }

  async showMessage(_header: any, _item: any, _state: any, _index: number, _slide_item: any) {
    let alert = await this.alertCtrl.create(
      {
        header: _header,        
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'OK',
            role: 'confirm',
            handler: () => {
              console.log("_item", _item)
              // console.log("slide_item", this.slide_item)
              console.log("_slide_item", _slide_item)              
              this.update_worker_activity_service(_item, _state, _index);
              _slide_item.close();         
            }
          }
        ]
      });
    await alert.present();
  }

  convertTimestampToDate(firebaseTimestamp: any): string {
    const date = new Date(firebaseTimestamp.seconds * 1000); // Convertir segundos a milisegundos
    return date.toISOString().substring(0, 10); // Formato YYYY-MM-DD
  }

  active_buttons(_date_services: any): boolean {
    let date_service = new Date(this.convertTimestampToDate(_date_services));
    let today = new Date();

    return today < date_service;
  }
}
