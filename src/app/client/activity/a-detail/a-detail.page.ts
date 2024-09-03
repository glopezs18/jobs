import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonRow, IonCol, IonLabel, IonIcon, IonThumbnail, IonItem, IonText, IonList, IonBadge } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  personCircle,
  locationOutline,
  readerOutline
} from 'ionicons/icons';
import { ActivatedRoute, Router } from "@angular/router";
import { RestService } from '../../../services/rest.service';
import { StaticElement } from '../../../services/static.element';

@Component({
  selector: 'app-a-detail',
  templateUrl: './a-detail.page.html',
  styleUrls: ['./a-detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonRow, IonCol, IonLabel, IonIcon, IonThumbnail, IonItem, IonText, IonList, IonBadge]
})
export class ADetailPage implements OnInit {

  current_activity_id: any = null;
  current_client_activity: any = null;
  state: Array<any> = [];

  constructor(
    private route: ActivatedRoute,
    private restService: RestService
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
      console.log("current_categorie", this.current_client_activity);
      
    } catch(error) {
      console.error("Error fetching category by ID:", error);
    }
    
  }
}
