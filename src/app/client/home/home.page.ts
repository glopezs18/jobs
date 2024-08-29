import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonSearchbar, 
  IonCol, 
  IonRow, 
  IonImg, 
  IonItem, 
  IonLabel, 
  IonGrid, 
  IonButton, 
  IonThumbnail, 
  IonSkeletonText, 
  IonCard, 
  IonCardContent, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardSubtitle, 
  IonSegment, 
  IonSegmentButton, 
  IonButtons
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../../explore-container/explore-container.component';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { RestService } from '../../services/rest.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [RouterModule, CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonSearchbar, IonCol, IonRow, IonGrid, IonImg, IonItem, IonButton, IonLabel, IonThumbnail, IonSkeletonText, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonSegment, IonSegmentButton, IonButtons]
})
export class HomePage implements OnInit {
  public loaded = false;

  worker_categories: any[] = [];
  // items: any[] = [];

  jobs_categories = [
    {
      id: 'j1',
      job_name: 'Plumbing',
      image: 'https://cdn.icon-icons.com/icons2/94/PNG/512/plumbing_16820.png'
    },
    {
      id: 'j2',
      job_name: 'Repairing',
      image: 'https://cdn.icon-icons.com/icons2/3045/PNG/512/toolbox_repair_box_tool_box_toolboxes_toolkit_icon_189326.png'
    },
    {
      id: 'j3',
      job_name: 'Electrical',
      image: 'https://cdn.icon-icons.com/icons2/3087/PNG/512/generator_electricity_electric_electrical_energy_icon_191371.png'
    },
    {
      id: 'j4',
      job_name: 'Cleaning',
      image: 'https://cdn.icon-icons.com/icons2/94/PNG/512/cleaning_16813.png'
    },
    {
      id: 'j5',
      job_name: 'Carpentry',
      image: 'https://cdn.icon-icons.com/icons2/94/PNG/512/carpentry_16805.png'
    },
    {
      id: 'j6',
      job_name: 'Painting',
      image: 'https://cdn.icon-icons.com/icons2/1617/PNG/512/3700457-art-artist-artistic-paint-painter-painting-palette_108753.png'
    },
    {
      id: 'j7',
      job_name: 'Moving',
      image: 'https://cdn.icon-icons.com/icons2/2313/PNG/512/truck_moving_vehicle_transport_transportation_shipping_icon_142014.png'
    },
    {
      id: 'j8',
      job_name: 'Handyman',
      image: 'https://cdn.icon-icons.com/icons2/1670/PNG/512/10514manconstructionworkerlightskintone_110617.png'
    }
  ]
  constructor(
    private restService: RestService
  ) { }

  ngOnInit() {        
    if (this.jobs_categories.length > 0) {
      this.loaded = true;
    }    
    this.get_worker_categories();
    
  }

  async get_worker_categories() {
    this.worker_categories = await this.restService.get_worker_categories();
    
    this.get_worker_categorie_by_id(this.worker_categories[0].id);
    console.log("this.worker_categories", this.worker_categories);
  }

   async get_worker_categorie_by_id(_wc_id: any) {    
    
    const result = await this.restService.get_worker_categorie_by_id(_wc_id);

    console.log("result_by_id", result);
    
  }
}
