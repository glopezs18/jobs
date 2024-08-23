import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonCard, 
  IonCardContent, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardSubtitle, 
  IonButtons, 
  IonBackButton,
  IonFooter,
  IonLabel,
  IonRow,
  IonCol,
  IonIcon,
  IonModal,
  IonInput,
  IonList, 
  IonItem,
  IonTextarea,
  IonText
} from '@ionic/angular/standalone';
import { Swiper } from 'swiper';
import { register } from 'swiper/element/bundle';
import { mailOutline, calendarOutline, sendOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { OverlayEventDetail } from '@ionic/core/components';

register();

@Component({
  selector: 'app-h-worker',
  templateUrl: './h-worker.page.html',
  styleUrls: ['./h-worker.page.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButtons, IonBackButton, IonFooter, IonLabel, IonRow, IonCol, IonIcon, IonModal, IonInput, IonList, IonItem, IonTextarea, IonText],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class HWorkerPage implements OnInit {
  @ViewChild(IonModal) modal_msg: IonModal;
  form_msg: FormGroup;
  msg: string;
  public swiper!: Swiper;
  constructor(private builder: FormBuilder) {
    addIcons({ mailOutline, calendarOutline, sendOutline });
   }

  ngOnInit() {
    this.form_msg = this.builder.group({
      // id: [null, Validators.required],
      subject: [null, Validators.required],
      message: [null, Validators.required]
    });
  }

  cancel() {
    this.modal_msg.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal_msg.dismiss('Giancarlo', 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.msg = `Hello, ${ev.detail.data}!`;
      console.log(this.msg);
      
    }
  }

}
