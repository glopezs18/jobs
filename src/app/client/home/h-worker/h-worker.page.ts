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
  IonText,
  IonToast,
  IonDatetime,
  IonSelect,
  IonSelectOption
} from '@ionic/angular/standalone';
import { Swiper } from 'swiper';
import { register } from 'swiper/element/bundle';
import { mailOutline, calendarOutline, sendOutline, checkmarkCircle, closeCircle } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { OverlayEventDetail } from '@ionic/core/components';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from "@angular/router";
import { RestService } from '../../../services/rest.service'
import { Timestamp } from 'firebase/firestore';
import { ChatService } from '../../../services/chat.service';


register();
@Component({
  selector: 'app-h-worker',
  templateUrl: './h-worker.page.html',
  styleUrls: ['./h-worker.page.scss'],
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButtons, IonBackButton, IonFooter, IonLabel, IonRow, IonCol, IonIcon, IonModal, IonInput, IonList, IonItem, IonTextarea, IonText, IonToast, IonDatetime, IonSelect, IonSelectOption],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class HWorkerPage implements OnInit {
  @ViewChild(IonModal) modal_msg: IonModal;
  @ViewChild(IonModal) modal_booking: IonModal;
  form_msg: FormGroup;
  msg: string;
  title_service: string;
  description_service: string;
  location_service: string;
  current_user_id = localStorage.getItem("userID");
  current_worker_id: any = null;
  current_worker: any = null;
  tzoffset = (new Date()).getTimezoneOffset() * 60000;
  min_date = (new Date(Date.now() - this.tzoffset)).toISOString().slice(0, -1);
  date_service = (new Date(Date.now() - this.tzoffset)).toISOString().slice(0, -1);
  isToastOpen = false;
  request_data: any = null;
  my_locations: any = null;

  current_category_id: any = null;
  data_category: any = null;

  current_data_user: any = null;

  isToastBookingOpen = false;
  toastMsg: string;
  toastIcon: string;
  toastColor: string;

  newMessage: string = '';

  public swiper!: Swiper;

  customAlertOptions = {
    header: 'Mis ubicaciones',
    subHeader: 'Selecciona una ubicación',
    // message: 'Choose only one',
    translucent: true,
  };

  constructor(
    private builder: FormBuilder,
    private route: ActivatedRoute,
    private restService: RestService,
    private chatService: ChatService
  ) {
    addIcons({sendOutline, mailOutline, calendarOutline, checkmarkCircle, closeCircle});
  }

  ngOnInit() {
    this.current_worker_id = this.route.snapshot.paramMap.get("id");
    this.current_category_id = this.route.snapshot.paramMap.get("category");
    this.get_worker_by_id(this.current_worker_id);
    this.get_categorie_by_id(this.current_category_id);
    this.get_client_locations(localStorage.getItem("userID"));
    this.get_client_profile(localStorage.getItem("userID"));    
    
    this.form_msg = this.builder.group({
      // id: [null, Validators.required],
      subject: [null, Validators.required],
      message: [null, Validators.required]
    });
  }

  async get_worker_by_id(_wc_id: any) {

    try {
      const data = await this.restService.get_worker_by_id(_wc_id);
      this.current_worker = data[0];
      // console.log("current_worker", this.current_worker);

    } catch (error) {
      console.error("Error fetching category by ID:", error);
    }

  }

  async get_categorie_by_id(_c_id: any) {

    try {
      const data = await this.restService.get_categorie_by_id(_c_id);
      this.data_category = data[0];

    } catch (error) {
      console.error("Error fetching category by ID:", error);
    }

  }

  async get_client_profile(_u_id: any) {
    try {
      const data = await this.restService.get_client_profile(_u_id);
      this.current_data_user = data[0];
      // console.log("current_data_user", this.current_data_user);

    } catch (error) {
      console.error("Error fetching category by ID:", error);
    }
  }

  async create_join_service() {    
    const date = new Date();
    const timestamp = Timestamp.fromDate(date);
    console.log("date_service", this.date_service);

    const date_request_service = new Date(this.date_service);
    const timestamp_request_service = Timestamp.fromDate(date_request_service);

    if (this.location_service != undefined && this.description_service != undefined) {
      this.request_data = {        
        client_name: this.current_worker.name,
        category: this.data_category.name,
        category_image: this.data_category.picture,
        cost: "0.00",
        created: timestamp,
        date_services: timestamp_request_service,
        detail: this.description_service,
        location: this.location_service,
        status: 0,
        title: this.title_service,
        worker_name: this.current_worker.name,
        worker_picture: this.current_worker.picture_profile
      }
      console.log("this.request_data", this.request_data);
      const result = await this.restService.create_join_service(this.current_worker.id, this.current_data_user.id, this.current_category_id, this.request_data);
      if (result) {
        this.modal_booking.dismiss(null, 'confirm');
        this.toastMsg = "Solicitud realizada correctamente!";
        this.toastIcon = "checkmark-circle";
        this.toastColor = "success";
        this.setOpenToastBooking(true);
      } else {
        this.toastMsg = "Hubo un problema al realziar tu solicitud. Inténtalo más tarde.";
        this.toastIcon = "close-circle";
        this.toastColor = "danger";
        this.setOpenToastBooking(true);
      }
    } else {
      console.log("faltan datos por llenar");
    }


  }

  async get_client_locations(_u_id: any) {
    try {
      const data = await this.restService.get_client_locations(_u_id);
      this.my_locations = data;
      // console.log(this.my_locations);

    } catch (error) {
      console.error("Error fetching category by ID:", error);
    }
  }

  cancelMsg() {
    this.modal_msg.dismiss(null, 'cancel');
  }

  confirmMsg() {
    this.modal_msg.dismiss('Giancarlo', 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      console.log("newMessage", this.newMessage);
      console.log("current_user_id", this.current_user_id);
      console.log("workerId", this.current_worker.id);
      
      this.sendMessage(this.current_user_id, this.current_worker.id, this.newMessage);
      this.setOpen(true);
    }
  }

  onWillDismissBooking(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {      

      this.create_join_service();

    }
  }

  async sendMessage(client_id: any, worker_id: any, message: any) {
    if (this.newMessage.trim()) {
      // Añadir el mensaje al chat
      await this.chatService.startChatAndSendMessage(client_id, worker_id, message, true);
      this.newMessage = ''; // Limpiar el input
    }
  }

  selectLocationChange(ev: any) {
    this.location_service = ev.target.value;
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  setOpenToastBooking(isOpen: boolean) {
    this.isToastBookingOpen = isOpen;
  }

}
