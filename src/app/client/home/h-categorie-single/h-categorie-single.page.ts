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
  IonSearchbar,
  IonCard, 
  IonCardContent, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardSubtitle,
  IonCol, 
  IonRow,
  IonImg,
  IonGrid
 } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from "@angular/router";
import { RouterModule } from '@angular/router';
import { RestService } from '../../../services/rest.service';
import { addIcons } from "ionicons";

@Component({
  selector: 'app-h-categorie-single',
  templateUrl: './h-categorie-single.page.html',
  styleUrls: ['./h-categorie-single.page.scss'],
  standalone: true,
  imports: [RouterModule, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonSearchbar, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCol, IonRow, IonGrid, IonImg]
})
export class HCategorieSinglePage implements OnInit {

  current_categorie_id: any = null;
  current_worker_categorie: any[] = [];
  current_categorie: any = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restService: RestService
  ) { }

  ngOnInit() {
    this.current_categorie_id = this.route.snapshot.paramMap.get("id");
    this.get_categorie_by_id(this.current_categorie_id);
    // this.get_worker_by_idcategorie(this.current_categorie_id);
  }

  // async get_worker_by_idcategorie(_wc_id: any) {       
    
  //   try {
  //     const data = await this.restService.get_worker_by_idcategorie(_wc_id);
  //     this.current_worker_categorie = data;      
      
  //   } catch(error) {
  //     console.error("Error fetching category by ID:", error);
  //   }
    
  // }

  async get_workers_by_category(_categorie: any) {       
    
    try {
      const data = await this.restService.get_workers_by_category(_categorie);
      this.current_worker_categorie = data;
      // console.log("get_workers_by_categorie", data);
      
    } catch(error) {
      console.error("Error fetching category by ID:", error);
    }
    
  }

  async get_categorie_by_id(_c_id: any) {       
    
    try {
      const data = await this.restService.get_categorie_by_id(_c_id);
      this.current_categorie = data[0];
      this.get_workers_by_category(this.current_categorie.name);
      // console.log("current_categorie", this.current_categorie);
      
    } catch(error) {
      console.error("Error fetching category by ID:", error);
    }
    
  }

  navigateToWorkerSingle(_item: any) {
    console.log(_item);
    
    this.router.navigate(['/client/home/h-worker/' + this.current_categorie_id + "/" + _item.id]);
  }

}
