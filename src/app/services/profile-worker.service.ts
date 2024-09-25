import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { initializeApp, FirebaseError } from "firebase/app";

import { getFirestore, DocumentData, Firestore, collection, doc, setDoc, getDocs, getDoc, deleteDoc, query, where, updateDoc, addDoc, CollectionReference } from 'firebase/firestore';
import { getDownloadURL, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { addIcons } from 'ionicons';
import {
  checkmarkCircle,
  closeCircle
} from 'ionicons/icons';

// Inicializa Firebase
const firebaseApp = initializeApp(environment.firebase);
const firestore = getFirestore(firebaseApp);

@Injectable({
  providedIn: 'root'
})
export class ProfileWorkerService {

  constructor(
    private storage: Storage,    
  ) {
    addIcons({ checkmarkCircle, closeCircle });
  }

  //Profile Worker
  async get_worker_profile(_cId: string): Promise<any[]> {
    const profileDoc = doc(firestore, `worker/${_cId}`);
    const profileSnapshot = await getDoc(profileDoc);
    if (profileSnapshot.exists()) {
      return [{ id: profileSnapshot.id, ...profileSnapshot.data() }];
    } else {
      // Manejar el caso en que el documento no existe
      throw new Error('Documento no encontrado');
    }
  }

  async update_worker_profile(_updated_data: any, _worker_id: any) {
    const workerDoc = doc(firestore, `worker/${_worker_id}`);

    try {
      return await updateDoc(workerDoc, _updated_data);
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  }


  //Categories
  async get_worker_categories(): Promise<any[]> {
    const colRef = collection(firestore, 'worker_category');
    const querySnapshot = await getDocs(colRef);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }


  // Subir imagen de perfil
  async uploadProfilePicture(file: File, userId: string): Promise<string> {
    const storageRef = ref(this.storage, `${userId}/pprofile-worker.jpg`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on('state_changed',
        (snapshot) => {
          // Progreso de la subida (opcional)
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          // Error en la subida
          console.error("Error uploading file: ", error);
          reject(error);
        },
        async () => {
          // Subida completa
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);                              
            resolve(downloadURL);
          } catch (e) {
            reject(e);
          }
        }
      );
    });
  }

  // Guardar la URL de la imagen en el documento del usuario
  async updateUserProfilePicture(userId: string, imageUrl: string): Promise<void> {
    const userDocRef = doc(firestore, `worker/${userId}`);
    try {
      await updateDoc(userDocRef, {
        picture_profile: imageUrl
      });
    } catch (error) {
      console.error("Error updating user profile picture: ", error);
    }
  }

  // Obtener la URL de la imagen de perfil
  async getProfilePicture(userId: string): Promise<string> {
    const storageRef = ref(this.storage, `${userId}/pprofile-worker.jpg`);
    try {
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.error("Error fetching profile picture URL: ", error);
      return ''; // O manejar el error de otra manera
    }
  }

}
