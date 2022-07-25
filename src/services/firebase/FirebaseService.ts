import type { FirebaseApp } from "firebase/app";
import { initializeApp } from "firebase/app";
import type { Firestore } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { singleton } from "tsyringe";

@singleton()
class FirebaseService {
  readonly app: FirebaseApp;
  readonly firestore: Firestore;

  constructor() {
    this.app = initializeApp({
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
      appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
    });

    this.firestore = getFirestore(this.app);
  }
}

export default FirebaseService;
