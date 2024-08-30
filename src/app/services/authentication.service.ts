import { Injectable } from '@angular/core';
// import { Auth, signInWithEmailAndPassword, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, User } from 'firebase/auth';
import { environment } from 'src/environments/environment';
import { getFirestore, DocumentData, Firestore, collection, doc, setDoc, getDocs, getDoc, deleteDoc, query, where, updateDoc, addDoc } from 'firebase/firestore';



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

    if (userDocWorker.exists()) {
      console.log("Worker");
      console.log(userDocWorker.data());
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
      this.router.navigate(['/client/home']);
    } else {
      console.log("El usuario no existe");
      
    }
  }

  logout() {
    this.auth.signOut().then(() => {
      localStorage.removeItem('userID');
      this.router.navigate(['/signin']);
    });
  }
}
