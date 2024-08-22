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

@Component({
  selector: 'app-h-categorie-single',
  templateUrl: './h-categorie-single.page.html',
  styleUrls: ['./h-categorie-single.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonSearchbar, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCol, IonRow, IonGrid, IonImg]
})
export class HCategorieSinglePage implements OnInit {

  current_categorie_id: any = null;
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.current_categorie_id = this.route.snapshot.paramMap.get("id");
  }

}
