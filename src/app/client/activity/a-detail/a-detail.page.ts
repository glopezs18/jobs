import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-a-detail',
  templateUrl: './a-detail.page.html',
  styleUrls: ['./a-detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton]
})
export class ADetailPage implements OnInit {

  current_activity_id: any = null;
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.current_activity_id = this.route.snapshot.paramMap.get("id");
  }

}
