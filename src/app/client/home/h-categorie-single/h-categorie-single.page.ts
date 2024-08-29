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
import { RestService } from '../../../services/rest.service'

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
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restService: RestService
  ) { }

  ngOnInit() {
    this.current_categorie_id = this.route.snapshot.paramMap.get("id");
    this.get_worker_categorie_by_id();
  }

  async get_worker_categorie_by_id() {    
    console.log("this.current_categorie_id", this.current_categorie_id);
    
    //  this.current_worker_categorie = await this.restService.get_worker_categorie_by_id(this.current_categorie_id);
    
  }

  navigateToWorkerSingle(_id: string) {
    this.router.navigate(['/client/home/h-worker/' + _id]);
  }

}
