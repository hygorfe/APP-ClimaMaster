import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-u',
  templateUrl: './login-u.page.html',
  styleUrls: ['./login-u.page.scss'],
})
export class LoginUPage implements OnInit {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router){}

  async login() {
    try {
      await this.authService.login(this.email, this.password);
      this.router.navigate(['/tabs/tab1']);
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error: any) {
    console.error('Login Error', error);
    if (error.code) {
      switch (error.code) {
        case 'auth/invalid-credential':
          this.errorMessage = 'Credenciais inválidas. Por favor, tente novamente.';
          break;
        case 'auth/user-not-found':
          this.errorMessage = 'Nenhum usuário encontrado com este email.';
          break;
        case 'auth/wrong-password':
          this.errorMessage = 'Senha incorreta.';
          break;
        default:
          this.errorMessage = 'Ocorreu um erro inesperado: ' + error.message;
      }
    } else {
      this.errorMessage = 'Ocorreu um erro desconhecido.';
    }
  }

  ngOnInit() {}
}
