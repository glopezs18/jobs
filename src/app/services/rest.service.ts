import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { environment } from 'src/environments/environment';
import { getFirestore, DocumentData, Firestore, collection, doc, setDoc, getDocs, getDoc, deleteDoc, query, where, updateDoc, addDoc } from 'firebase/firestore';

// Inicializa Firebase
const firebaseApp = initializeApp(environment.firebase);
const firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor() { }

  //Categories
  async get_worker_categories() {
    const colRef = collection(firestore, 'worker_category');
    const querySnapshot = await getDocs(colRef);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async get_categorie_by_id(_cId: string): Promise<any[]> {
    const workerDoc = doc(firestore, `worker_category/${_cId}`);
    const workerSnapshot = await getDoc(workerDoc);
    if (workerSnapshot.exists()) {
      return [{ id: workerSnapshot.id, ...workerSnapshot.data() }];
    } else {
      // Manejar el caso en que el documento no existe
      throw new Error('Documento no encontrado');
    }
  }

  async get_worker_by_idcategorie(_wcId: string): Promise<any[]> {
    // Crear referencia al documento de la categoría
    const categoryRef = doc(firestore, `worker_category/${_wcId}`);
    // Referencia a la colección de trabajadores
    const workersRef = collection(firestore, 'worker');
    // Consulta donde 'worker_category' coincide con la referencia de categoría
    const q = query(workersRef, where('worker_category', '==', categoryRef));
    // Ejecutar la consulta
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }


  //Workers
  async get_worker_by_id(_wId: string): Promise<any[]> {
    const workerDoc = doc(firestore, `worker/${_wId}`);
    const workerSnapshot = await getDoc(workerDoc);
    if (workerSnapshot.exists()) {
      return [{ id: workerSnapshot.id, ...workerSnapshot.data() }];
    } else {
      // Manejar el caso en que el documento no existe
      throw new Error('Documento no encontrado');
    }
  }
}
