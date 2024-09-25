import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonList,
  IonItem,
  IonLabel,
  IonFooter,
  IonInput,
  IonButton,
  IonIcon,
  IonModal,
  IonTextarea,
  IonText,
  IonToast,
  IonDatetime,
  IonSelect,
  IonSelectOption
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { addIcons } from 'ionicons';
import { send, constructOutline } from 'ionicons/icons';
import { ChatService } from '../../../../services/chat.service';
import { Observable } from 'rxjs';
import { OverlayEventDetail } from '@ionic/core/components';
import { Timestamp } from 'firebase/firestore';
import { ProfileWorkerService } from '../../../../services/profile-worker.service'
import { RestService } from '../../../../services/rest.service'

interface Message {
  text: string;
  sent: boolean;
  timestamp: Date;
}

@Component({
  selector: 'app-j-r-chat-detail',
  templateUrl: './j-r-chat-detail.page.html',
  styleUrls: ['./j-r-chat-detail.page.scss'],
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
    IonList,
    IonItem,
    IonLabel,
    IonFooter,
    IonInput,
    IonButton,
    IonIcon,
    IonModal,
    IonTextarea,
    IonText,
    IonToast,
    IonDatetime,
    IonSelect,
    IonSelectOption
  ]
})
export class JRChatDetailPage implements OnInit {
  @ViewChild(IonModal) modal_booking: IonModal;

  workerId = localStorage.getItem("userID");  // ID del trabajador
  current_worker: any = null;
  client_id: any = null;  // ID del cliente con quien estás chateando
  current_chat_id: any = null;
  current_chat_data: any[] = [];
  messages: any[] = [];
  newMessage: string = '';

  //Service Request
  title_service: string;
  description_service: string;
  cost_service: string;
  location_service: string;
  category_service: string;
  id_category_service: string;
  img_category_service: string;
  tzoffset = (new Date()).getTimezoneOffset() * 60000;
  min_date = (new Date(Date.now() - this.tzoffset)).toISOString().slice(0, -1);
  date_service = (new Date(Date.now() - this.tzoffset)).toISOString().slice(0, -1);
  isToastBookingOpen = false;
  toastMsg: string;
  toastIcon: string;
  toastColor: string;
  current_data_user: any = null;
  availableCategories: any = [];

  customAlertOptions = {
    header: 'Servicios disponibles',
    subHeader: 'Selecciona una ubicación',
    // message: 'Choose only one',
    translucent: true,
  };

  request_data: any = null;


  constructor(private route: ActivatedRoute, private chatService: ChatService, private profileService: ProfileWorkerService, private restService: RestService,) {
    addIcons({ send, constructOutline });
  }

  ngOnInit() {
    this.current_chat_id = this.route.snapshot.paramMap.get("id");
    this.getChatData(this.current_chat_id);
    this.get_worker_categories();
    this.get_worker_by_id(this.workerId);
    // this.route.queryParams.subscribe((params: any) => {
    //   if (params['chatId']) {
    //     console.log(params['chatId']);

    //     // Lógica para obtener el nombre del cliente y mensajes
    //     // clientName = obtenerNombreDelCliente(params['chatId']);
    //   }
    // });

    // Escuchar los mensajes en tiempo real


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

  async get_client_profile(_u_id: any) {
    try {
      const data = await this.restService.get_client_profile(_u_id);
      this.current_data_user = data[0];
      // console.log("current_data_user", this.current_data_user);

    } catch (error) {
      console.error("Error fetching category by ID:", error);
    }
  }

  async getChatData(chatId: any) {
    try {
      const data = await this.chatService.getChatData(chatId);
      this.current_chat_data = data;
      this.client_id = this.current_chat_data[0].clientId;
      this.get_client_profile(this.client_id);
      this.chatService.createOrGetChat(this.client_id, this.workerId).then(chatId => {
        this.chatService.listenToChatMessages(chatId, (messages: any) => {
          this.messages = messages;
          // console.log("this.messages", messages);

        });
      });
      // console.log("data", this.current_chat_data);
      // console.log("current_categorie", this.current_client_activity);

    } catch (error) {
      console.error("Error fetching chat by ID:", error);
    }
  }

  async get_worker_categories() {
    const data = await this.profileService.get_worker_categories();
    try {
      for (let index = 0; index < data.length; index++) {
        this.availableCategories.push(data[index]);
        console.log(this.availableCategories);

      }
    } catch (error) {

    }

  }

  selectServiceChange(ev: any) {
    this.category_service = ev.target.value.name;
    this.id_category_service = ev.target.value.id;
    this.img_category_service = ev.target.value.picture;
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
        category: this.id_category_service,
        category_image: this.img_category_service,
        cost: this.cost_service,
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
      const result = await this.restService.create_join_service(this.current_worker.id, this.current_data_user.id, this.id_category_service, this.request_data);
      if (result) {
        this.modal_booking.dismiss(null, 'confirm');
        this.toastMsg = "Solicitud realizada correctamente!";
        this.toastIcon = "checkmark-circle";
        this.toastColor = "success";
        this.setOpenToastBooking(true);

        this.category_service = "";
        this.description_service = "";
        this.cost_service = "";
        this.title_service = "";
        this.location_service = "";
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

  async sendMessage() {
    if (this.newMessage.trim()) {
      // Añadir el mensaje al chat
      await this.chatService.startChatAndSendMessage(this.client_id, this.workerId, this.newMessage, false);
      this.newMessage = ''; // Limpiar el input
    }
  }

  onWillDismissBooking(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {

      this.create_join_service();

    }
  }


  setOpenToastBooking(isOpen: boolean) {
    this.isToastBookingOpen = isOpen;
  }
}
