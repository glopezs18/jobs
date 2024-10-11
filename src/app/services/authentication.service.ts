import { Injectable } from '@angular/core';
// import { Auth, signInWithEmailAndPassword, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, User, updatePassword, EmailAuthProvider, reauthenticateWithCredential, createUserWithEmailAndPassword } from 'firebase/auth';
import { environment } from 'src/environments/environment';
import { getFirestore, DocumentData, Firestore, collection, doc, setDoc, getDocs, getDoc, deleteDoc, query, where, updateDoc, addDoc, Timestamp } from 'firebase/firestore';
import { getMessaging, getToken } from 'firebase/messaging';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private firebaseApp = initializeApp(environment.firebase);
  private auth = getAuth(this.firebaseApp);
  private firestore = getFirestore(this.firebaseApp);
  currentUser: User | null = null;

  constructor(
    // private auth: Auth,    
    private router: Router
  ) { }

  async login(email: string, password: string) {

    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      console.log(userCredential.user);

      this.currentUser = userCredential.user;

      if (this.currentUser) {
        const uid = this.currentUser.uid;

        // Guarda el UID en localStorage
        localStorage.setItem('userID', uid);

        // Redirige según el tipo de usuario
        this.redirectUserBasedOnType(uid);
      }
    } catch (error) {
      console.error("Error en el login: ", error);
    }
  }

  async redirectUserBasedOnType(uid: string) {
    console.log("uid", uid);

    const userDocWorkerRef = doc(this.firestore, `worker/${uid}`);
    const userDocWorker = await getDoc(userDocWorkerRef);
    const userDocClientRef = doc(this.firestore, `client/${uid}`);
    const userDocClient = await getDoc(userDocClientRef);

    // const token_fcm = await this.get_token_fcm();
    if (userDocWorker.exists()) {
      console.log("Worker");
      console.log(userDocWorker.data());
      // await this.get_token_fcm("worker");
      // await this.associate_token(uid, token_fcm);
      this.router.navigate(['/worker/home']);
      // const userData = userDoc.data();
      // const userType = userData['type'];
      
      // if (userType === 1) {
      //   this.router.navigate(['/worker/home']);
      // } else if (userType === 2) {
      //   this.router.navigate(['/client/home']);
      // }
    } else if(userDocClient.exists()){
      console.log("Client");      
      console.log(userDocClient.data());
      // await this.get_token_fcm("client");
      this.router.navigate(['/client/home']);
    } else {
      console.log("El usuario no existe");
      
    }
  }

  // Reautenticar al usuario
  async reauthenticateUser(email: string, currentPassword: string): Promise<void> {
    const user: User | null = this.auth.currentUser;
    if (user) {
      const credential = EmailAuthProvider.credential(email, currentPassword);

      try {
        // Reautenticación del usuario
        await reauthenticateWithCredential(user, credential);
        console.log('Usuario reautenticado correctamente');
      } catch (error) {
        console.error('Error al reautenticar el usuario', error);
      }
    }
  }

  async changePassword(newPassword: string): Promise<void> {
    const auth = getAuth();
    const user: User | null = auth.currentUser;    
    
    if (user) {
      try {
        await updatePassword(user, newPassword);
        console.log('Contraseña cambiada exitosamente');
      } catch (error: any) {
        console.error('Error al cambiar la contraseña auth:', error.message);
        throw error;
      }
    } else {
      throw new Error('Usuario no autenticado');
    }
  }

  logout() {
    this.auth.signOut().then(() => {
      localStorage.removeItem('userID');
      this.router.navigate(['/signin']);
    });
  }

  async registerClient(client: any) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, client.email, client.password);
      const userId = userCredential.user?.uid;
      const clientRef = collection(this.firestore, 'client');

      console.log("userId", userId);
      console.log("firestore", this.firestore);

      const date = new Date(client.birthday);
      const timestamp = Timestamp.fromDate(date);
      
      await setDoc(doc(this.firestore, "client", userId), {
        name: client.name || '',
        email: client.email || '',
        phone: client.phone || '',
        gender: (client.gender == "male") ? 1 : 2,
        password: client.password || '',
        birthday: timestamp || '',
        type: client.type || '',
        date_register: new Date()
      });
      console.log('Documento creado exitosamente en Firestore');
    } catch (error: any) {
      console.error('Error en el registro:', error);
    }
  }

  async registerWorker(worker: any) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, worker.email, worker.password);
      const userId = userCredential.user?.uid;

      const date = new Date(worker.birthday);
      const timestamp = Timestamp.fromDate(date);

      await setDoc(doc(this.firestore, 'worker', userId), {
        name: worker.name,
        dpi: worker.dpi,
        email: worker.email,
        phone: worker.phone,
        birthday: timestamp,
        gender: (worker.gender == "male") ? 1 : 2,
        password: worker.password,
        type: worker.type,
        date_register: new Date()
      });

      
    } catch (error: any) {
      
    }
  }


  //Token FCM
  async get_token_fcm() {
    try {
      const messaging = getMessaging();
      const currentToken = await getToken(messaging, { vapidKey: 'BC50NAU76lb822N8JwOxGc35PddDgYvX443rt3rFHwysMtkqVDucqpOONMhjIolDhSbYKMl0b_L3wB5kfgtJc2M' });

      if (currentToken) {
        console.log('Token FCM obtenido:', currentToken);
        // Almacena este token en Firestore o Realtime Database asociado al empleado
        return currentToken;
      } else {
        console.log('No se encontró token FCM');
        return null;
      }
    } catch (error) {
      console.error('Error obteniendo token FCM:', error);
      throw error;
    }
  }


  async associate_token(_workerId: string, _token: any) {
    const workerDoc = doc(this.firestore, `worker/${_workerId}`);
    await updateDoc(workerDoc, { fcmToken: _token });
  }
}
