import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {}

  async register() { 
    if (this.isValidEmail(this.email)) { 
      try { 
        const userCredential = await this.authService.register(this.email, this.password); 
        await userCredential.user?.updateProfile({
          displayName: this.name
        });
        this.router.navigate(['/tabs/tab1']); 
      } catch (error) {
        this.handleError(error);
      } 
    } else { 
      console.error('Formato de email inválido');
      this.errorMessage = 'Formato de email inválido';
    } 
  }

  handleError(error: any) {
    console.error('Register error:', error);
    if (error.code) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          this.errorMessage = 'Este email já está em uso. Por favor, use outro email.';
          break;
        default:
          this.errorMessage = 'Ocorreu um erro inesperado: ' + error.message;
      }
    } else {
      this.errorMessage = 'Ocorreu um erro desconhecido.';
    }
  }

  isValidEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    return re.test(String(email).toLowerCase());
  }

  ngOnInit() { }
}
