import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { environment } from 'src/environments/environment';
import { getFirestore, Firestore, collection, doc, setDoc, getDocs, getDoc, deleteDoc, query, where, updateDoc, addDoc } from 'firebase/firestore';

// Inicializa Firebase
const firebaseApp = initializeApp(environment.firebase);
const firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor() { }

  //Worker Categories
  async get_worker_categories() {
    const colRef = collection(firestore, 'worker_category');
    const querySnapshot = await getDocs(colRef);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async get_worker_categorie_by_id(id: string) {
    const workerDoc = doc(firestore, `worker_category/${id}`);
    const workerSnapshot = await getDoc(workerDoc);
    if (workerSnapshot.exists()) {
      return { id: workerSnapshot.id, ...workerSnapshot.data() };
    } else {
      // Manejar el caso en que el documento no existe
      throw new Error('Documento no encontrado');
    }
  }
}
