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

@Component({
  selector: 'app-a-detail',
  templateUrl: './a-detail.page.html',
  styleUrls: ['./a-detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonRow, IonCol, IonLabel, IonIcon, IonThumbnail, IonItem, IonText, IonList, IonBadge]
})
export class ADetailPage implements OnInit {

  current_activity_id: any = null;
  constructor(
    private route: ActivatedRoute
  ) { 
    addIcons({ personCircle, locationOutline, readerOutline })
  }

  ngOnInit() {
    this.current_activity_id = this.route.snapshot.paramMap.get("id");
  }

}
