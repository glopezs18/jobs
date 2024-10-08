import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { environment } from 'src/environments/environment';
import { getFirestore, DocumentData, Firestore, collection, doc, setDoc, getDocs, getDoc, deleteDoc, query, where, updateDoc, addDoc, CollectionReference, QuerySnapshot } from 'firebase/firestore';
import { Subject } from 'rxjs';

// Inicializa Firebase
const firebaseApp = initializeApp(environment.firebase);
const firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private perfilActualizado = new Subject<void>();
  private solicitudesActualizadas = new Subject<void>();

  // Observable para que otros componentes se suscriban
  perfilActualizado$ = this.perfilActualizado.asObservable();
  solicitudesActualizadas$ = this.solicitudesActualizadas.asObservable();

  private clientLocationCollection: CollectionReference;
  constructor() {
    this.clientLocationCollection = collection(firestore, 'client_location');
  }

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

  async get_workers_by_category(category: string) {
    const workersRef = collection(firestore, 'worker');
    const q = query(workersRef, where('categories', 'array-contains', category));


    try {
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
      const workers = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      return workers;
    } catch (error) {
      console.error("Error fetching workers by category: ", error);
      return [];
    }
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

  //Activities Client
  async get_worker_activity_service_by_idclient(_wjsId: string): Promise<any[]> {
    // Crear referencia al documento de la actividad
    const clientRef = doc(firestore, `client/${_wjsId}`);
    // Referencia a la colección de trabajadores
    const workerJoinServiceRef = collection(firestore, 'worker_join_service');
    // Consulta donde 'worker_category' coincide con la referencia de categoría
    const q = query(workerJoinServiceRef, where('client_id', '==', clientRef));
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
      await updateDoc(workerActivityServiceDoc, _updated_data);
      this.solicitudesActualizadas.next();
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  }

  //Locations Client
  async get_client_locations(_client_id: string) {
    const clientRef = doc(firestore, `client/${_client_id}`);
    const profileLocationRef = collection(firestore, 'client_location');

    const q = query(profileLocationRef, where('client_id', '==', clientRef));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }

  async get_client_location_by_id(_location_id: string): Promise<any[]> {
    const clientLocationDoc = doc(firestore, `client_location/${_location_id}`);
    const clientLocationSnapshot = await getDoc(clientLocationDoc);
    if (clientLocationSnapshot.exists()) {
      return [{ id: clientLocationSnapshot.id, ...clientLocationSnapshot.data() }];
    } else {
      // Manejar el caso en que el documento no existe
      throw new Error('Documento no encontrado');
    }
  }

  async create_client_location(_location: any, _client_id: any): Promise<any> {
    try {
      const clientRef = doc(firestore, `client/${_client_id}`);
      // Agregar la referencia al campo client_id
      _location.client_id = clientRef;


      return await addDoc(this.clientLocationCollection, _location);
    } catch (e) {
      console.error("Error adding document: ", e);
      return null;
    }
  }

  async update_client_location(_location_id: string, _updated_data: any, _client_id: any) {
    const clientRef = doc(firestore, `client/${_client_id}`);

    _updated_data.client_id = clientRef;

    const locationDoc = doc(firestore, `client_location/${_location_id}`);

    try {
      return await updateDoc(locationDoc, _updated_data);
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  }

  async deleteClientLocation(locationId: string) {
    const locationDoc = doc(firestore, `client_location/${locationId}`);
    try {
      return await deleteDoc(locationDoc);
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  }

  //Profile Client
  async get_client_profile(_cId: string): Promise<any[]> {
    const profileDoc = doc(firestore, `client/${_cId}`);
    const profileSnapshot = await getDoc(profileDoc);
    if (profileSnapshot.exists()) {
      return [{ id: profileSnapshot.id, ...profileSnapshot.data() }];
    } else {
      // Manejar el caso en que el documento no existe
      throw new Error('Documento no encontrado');
    }
  }

  async update_client_profile(_updated_data: any, _client_id: any) {
    const clientDoc = doc(firestore, `client/${_client_id}`);

    try {
      await updateDoc(clientDoc, _updated_data);
      this.perfilActualizado.next();

    } catch (e) {
      console.error("Error updating document: ", e);
    }
  }  

  //Solicitudes de servicio
  async create_join_service(_workerId: string, _clientId: string, _categoryId: string, _solicitudData: any) {
    try {
      // Obtener referencias a los documentos
      const workerRef = doc(firestore, `worker/${_workerId}`);
      const clientRef = doc(firestore, `client/${_clientId}`);
      const categoryRef = doc(firestore, `worker_category/${_categoryId}`);

      // Añadir la solicitud con las referencias
      const solicitudesRef = collection(firestore, 'worker_join_service');
      const solicitud = {
        ..._solicitudData,
        worker_id: workerRef,   // Guardar referencia del trabajador
        client_id: clientRef,   // Guardar referencia del cliente
        worker_category: categoryRef, // Guardar referencia de la categoría
        status: 0,           // Estado pendiente (por ejemplo)
        createdAt: new Date(),
      };

      const docRef = await addDoc(solicitudesRef, solicitud);
      return docRef.id;
    } catch (error) {
      console.error('Error creando solicitud: ', error);
      throw error;
    }
  }
}
