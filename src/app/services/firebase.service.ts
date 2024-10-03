import { Injectable } from '@angular/core';
import { Auth, getAuth, onAuthStateChanged } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private app: any; // Define the app instance
  private auth: Auth; // Explicit type for auth
  private firestore: Firestore; // Explicit type for firestore

  constructor() {
    // Initialize Firebase app and services
    this.app = initializeApp(environment.firebaseConfig);
    this.auth = getAuth(this.app);
    this.firestore = getFirestore(this.app); // Initialize Firestore with app instance

    // Listen for auth state changes
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        console.log('User is signed in:', user);
      } else {
        console.log('No user is signed in.');
      }
    });
  }

  // Add a method to test Firestore connection
  async testFirestoreConnection() {
    try {
      // Just check if Firestore is initialized
      console.log('Firestore initialized:', this.firestore !== null);
    } catch (error) {
      console.error('Error checking Firestore:', error);
    }
  }
}
