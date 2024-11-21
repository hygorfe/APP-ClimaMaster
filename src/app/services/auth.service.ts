import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  async login(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async register(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  async logout(): Promise<void> {
    return this.afAuth.signOut();
  }

  getCurrentUser() {
    return this.afAuth.authState;
  }

  async checkEmailExists(email: string): Promise<boolean> {
    try {
      const methods = await this.afAuth.fetchSignInMethodsForEmail(email);
      console.log(`Email: ${email}`, 'Methods:', methods); // Log detalhado
      return methods.length > 0;
    } catch (error) {
      console.error('Error checking email existence:', error);
      return false;
    }
  }
}
