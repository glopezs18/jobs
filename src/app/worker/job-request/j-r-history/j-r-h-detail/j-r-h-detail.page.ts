import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonBadge
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { addIcons } from "ionicons";
import { StaticElement } from '../../../../services/static.element';
import { RestWorkerService } from '../../../../services/rest.worker.service';

@Component({
  selector: 'app-j-r-h-detail',
  templateUrl: './j-r-h-detail.page.html',
  styleUrls: ['./j-r-h-detail.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButtons,
    IonBackButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonBadge
  ]
})
export class JRHDetailPage implements OnInit {

  job: any;
  current_activity_id: any = null;
  current_worker_activity: any = null;
  state: Array<any> = [];

  constructor(private route: ActivatedRoute, private restService: RestWorkerService,) { }

  ngOnInit() {
    this.current_activity_id = this.route.snapshot.paramMap.get("id");
    console.log(this.current_activity_id);

    this.init_static();
    this.get_worker_activity_service_by_id(this.current_activity_id);
  }

  async get_worker_activity_service_by_id(_wc_id: any) {

    try {
      const data = await this.restService.get_worker_activity_service_by_id(_wc_id);      
      this.current_worker_activity = data[0];
      // console.log("current_worker_activity", this.current_worker_activity);

    } catch (error) {
      console.error("Error fetching category by ID:", error);
    }

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

}
