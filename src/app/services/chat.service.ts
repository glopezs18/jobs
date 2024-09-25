import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { environment } from 'src/environments/environment';
import { getFirestore, collection, addDoc, doc, setDoc, getDoc, updateDoc, getDocs, query, where, Timestamp, orderBy, onSnapshot, arrayUnion } from 'firebase/firestore';

// Inicializa Firebase
const firebaseApp = initializeApp(environment.firebase);
const firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor() { }

  async getChatData(chatId: any) {
    // Crear referencia al documento de la categoría
    const chatRef = doc(firestore, `chats/${chatId}`);
    const chatSnapshot = await getDoc(chatRef);
    if (chatSnapshot.exists()) {
      return [{ id: chatSnapshot.id, ...chatSnapshot.data() }];
    } else {
      // Manejar el caso en que el documento no existe
      throw new Error('Documento no encontrado');
    }
  }

  // Función para crear una conversación o recuperar una existente
  async createOrGetChat(clientId: any, workerId: any) {
    const chatRef = collection(firestore, 'chats');

    // Busca si ya existe un chat entre el cliente y el trabajador
    const chatQuery = query(chatRef, where('clientId', '==', clientId), where('workerId', '==', workerId));
    const chatSnapshot = await getDocs(chatQuery);

    if (!chatSnapshot.empty) {
      // Si existe, retorna el ID del chat
      return chatSnapshot.docs[0].id;
    } else {
      // Si no existe, crea uno nuevo
      const chatDoc = await addDoc(chatRef, {
        clientId,
        workerId,
        createdAt: new Date()
      });
      return chatDoc.id;
    }
  }

  // Función para agregar un mensaje al chat
  async sendMessage(chatId: string, message: string, senderId: string, isClient: boolean) {
    const chatRef = doc(firestore, 'chats', chatId);
    const messagesRef = collection(firestore, 'chats', chatId, 'messages');

    // Añadir el nuevo mensaje a la subcolección de mensajes
    await addDoc(messagesRef, {
      senderId: senderId,
      message: message,
      timestamp: Timestamp.now(),
      readByClient: isClient ? true : false,
      readByWorker: isClient ? false : true
    });

    // Actualizar el documento de chat con el último mensaje y el contador de no leídos
    if (isClient) {
      // Si el cliente envía el mensaje, aumenta el contador de no leídos del trabajador
      await updateDoc(chatRef, {
        lastMessage: message,
        lastMessageTimestamp: Timestamp.now(),
        unreadCountWorker: arrayUnion(1) // Aquí aumentamos el contador del trabajador
      });
    } else {
      // Si el trabajador envía el mensaje, aumenta el contador de no leídos del cliente
      await updateDoc(chatRef, {
        lastMessage: message,
        lastMessageTimestamp: Timestamp.now(),
        unreadCountClient: arrayUnion(1) // Aquí aumentamos el contador del cliente
      });
    }
  }

  // Escuchar en tiempo real los mensajes de un chat
  listenToChatMessages(chatId: string, callback: (messages: any[]) => void) {
    const messagesRef = collection(firestore, `chats/${chatId}/messages`);
    const messagesQuery = query(messagesRef, orderBy('timestamp', 'asc'));

    onSnapshot(messagesQuery, (snapshot) => {
      const messages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(messages);
    });
  }

  async startChatAndSendMessage(clientId: any, workerId: any, message: string, isClient: boolean) {
    const chatId = await this.createOrGetChat(clientId, workerId);

    if (isClient) {
      await this.sendMessage(chatId, message, clientId, isClient);
    } else {
      await this.sendMessage(chatId, message, workerId, isClient);
    }
    
  }

  async markAsRead(chatId: any, isClient: boolean) {
    const chatRef = doc(firestore, 'chats', chatId);

    if (isClient) {
      // Si el cliente abre el chat, marca los mensajes como leídos para el cliente
      await updateDoc(chatRef, {
        unreadCountClient: 0  // Reiniciar el contador de mensajes no leídos para el cliente
      });
    } else {
      // Si el trabajador abre el chat, marca los mensajes como leídos para el trabajador
      await updateDoc(chatRef, {
        unreadCountWorker: 0  // Reiniciar el contador de mensajes no leídos para el trabajador
      });
    }
  }

  async getChatsWithLastMessage(userId: any, isClient: boolean) {
    const chatsRef = collection(firestore, 'chats');
    let q;

    // Consulta para obtener los chats donde el cliente o el trabajador participa
    if (isClient) {
      q = query(chatsRef, where('clientId', '==', userId), orderBy('lastMessageTimestamp', 'desc'));
    } else {
      q = query(chatsRef, where('workerId', '==', userId), orderBy('lastMessageTimestamp', 'desc'));
    }

    const chatDocs = await getDocs(q);
    const chatList: any[] = [];
    console.log("chatDocs", chatDocs);
    
    for (const chatDoc of chatDocs.docs) {
      const chatData = chatDoc.data();

      // Obtener la referencia del cliente o trabajador para obtener la foto de perfil
      let profileData = null;

      if (isClient) {
        // Si es cliente, obtener la foto de perfil del trabajador
        const workerRef = doc(firestore, 'worker', chatData["workerId"]);
        const workerSnap = await getDoc(workerRef);
        profileData = workerSnap.exists() ? workerSnap.data() : null;
      } else {
        // Si es trabajador, obtener la foto de perfil del cliente
        const clientRef = doc(firestore, 'client', chatData["clientId"]);
        const clientSnap = await getDoc(clientRef);
        profileData = clientSnap.exists() ? clientSnap.data() : null;
      }

      // Agregar el chat con la información necesaria
      chatList.push({
        id: chatDoc.id,
        lastMessage: chatData["lastMessage"],
        lastMessageTimestamp: chatData["lastMessageTimestamp"],
        unreadCount: isClient ? chatData["unreadCountClient"] : chatData["unreadCountWorker"],
        profilePicture: profileData ? profileData["picture_profile"] : null,  // Foto de perfil
        profileName: profileData ? profileData["name"] : 'Desconocido',      // Nombre
        isUnread: isClient ? chatData["unreadCountClient"] > 0 : chatData["unreadCountWorker"] > 0  // Estado de no leído
      });
    }

    return chatList;
  }
}
