import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { initializeApp } from "firebase/app";
import { getFirestore, Firestore, doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';


// Inicializa Firebase
const firebaseApp = initializeApp(environment.firebase);
const firestore = getFirestore(firebaseApp);

@Injectable({
    providedIn: 'root'
})

export class ProfileService {
        
    constructor(        
        private storage: Storage
    ) { }

    // Subir imagen de perfil
    async uploadProfilePicture(file: File, userId: string): Promise<string> {
        const storageRef = ref(this.storage, `${userId}/profile.jpg`);
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
        const userDocRef = doc(firestore, `client/${userId}`);
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
        const storageRef = ref(this.storage, `${userId}/pprofile.jpg`);
        try {
            return await getDownloadURL(storageRef);
        } catch (error) {
            console.error("Error fetching profile picture URL: ", error);
            return ''; // O manejar el error de otra manera
        }
    }
}