import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { environment } from 'src/environments/environment';
import { getFirestore, DocumentData, Firestore, collection, doc, setDoc, getDocs, getDoc, deleteDoc, query, where, updateDoc, addDoc, CollectionReference, QuerySnapshot } from 'firebase/firestore';


// Inicializa Firebase
const firebaseApp = initializeApp(environment.firebase);
const firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

@Injectable({
  providedIn: 'root'
})
export class RestWorkerService {

  private solicitudesActualizadas = new Subject<void>();

  // Observable para que otros componentes se suscriban
  solicitudesActualizadas$ = this.solicitudesActualizadas.asObservable();

  constructor() { }

  //Activities worker
  async get_worker_activity_service_by_idworker(_wjsId: string): Promise<any[]> {
    // Crear referencia al documento de la actividad
    const workerRef = doc(firestore, `worker/${_wjsId}`);
    // Referencia a la colección de trabajadores
    const workerJoinServiceRef = collection(firestore, 'worker_join_service');
    // Consulta donde 'worker_category' coincide con la referencia de categoría
    const q = query(workerJoinServiceRef, where('status', 'in', [0, 1]), where('worker_id', '==', workerRef));
    // Ejecutar la consulta
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }

  async get_total_worker_activity_service_by_idworker(_wjsId: string): Promise<any[]> {
    // Crear referencia al documento de la actividad
    const workerRef = doc(firestore, `worker/${_wjsId}`);
    // Referencia a la colección de trabajadores
    const workerJoinServiceRef = collection(firestore, 'worker_join_service');
    // Consulta donde 'worker_category' coincide con la referencia de categoría
    const q = query(workerJoinServiceRef, where('worker_id', '==', workerRef));
    // Ejecutar la consulta
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }

  async get_worker_activity_service_complete_by_idworker(_wjsId: string) {
    // Crear referencia al documento de la actividad
    const workerRef = doc(firestore, `worker/${_wjsId}`);
    // Referencia a la colección de trabajadores
    const workerJoinServiceRef = collection(firestore, 'worker_join_service');
    // Consulta donde 'worker_category' coincide con la referencia de categoría
    const q = query(workerJoinServiceRef, where('worker_id', '==', workerRef), where('status', 'in', [2, 3]));
    // Ejecutar la consulta
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }

  async get_worker_activity_service_by_id(_wjsId: string): Promise<any[]> {
    const workerJoinServiceDoc = doc(firestore, `worker_join_service/${_wjsId}`);
    const workerJoinServiceSnapshot = await getDoc(workerJoinServiceDoc);
    if (workerJoinServiceSnapshot.exists()) {
      return [{ id: workerJoinServiceSnapshot.id, ...workerJoinServiceSnapshot.data() }];
    } else {
      // Manejar el caso en que el documento no existe
      throw new Error('Documento no encontrado');
    }
  }


  async update_worker_activity_service(_updated_data: any, _wasId: string) {
    const workerActivityServiceDoc = doc(firestore, `worker_join_service/${_wasId}`);

    try {
      // return await updateDoc(workerActivityServiceDoc, _updated_data);      
      await updateDoc(workerActivityServiceDoc, _updated_data);
      this.solicitudesActualizadas.next();
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  }

  async getWorkerScheduledServices(workerId: any): Promise<any[]> {
    try {
      const workerRef = doc(firestore, `worker/${workerId}`);
      // Referencia a la colección de trabajadores
      const workerJoinServiceRef = collection(firestore, 'worker_join_service');
      // Consulta donde 'worker_category' coincide con la referencia de categoría
      // const q = query(workerJoinServiceRef, where('worker_id', '==', workerRef), where('status', 'in', [2, 3]));
      // Referencia a la colección 'worker_join_service'
      const workerJoinServiceCollection = collection(firestore, 'worker_join_service');

      // Crear una consulta donde el workerId coincida
      const q = query(workerJoinServiceCollection, where('worker_id', '==', workerRef));

      // Obtener los documentos que coinciden con la consulta
      const querySnapshot = await getDocs(q);

      // Convertir los resultados a un array de objetos con id y datos
      const services = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      return services;
    } catch (error) {
      console.error('Error obteniendo servicios calendarizados:', error);
      throw new Error('No se pudieron obtener los servicios agendados.');
    }
  }

}
