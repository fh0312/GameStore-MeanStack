import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor() { }

  login() {
    // Lógica para fazer login e autenticar o usuário
    this.isAuthenticated.next(true);
  }

  logout() {
    // Lógica para fazer logout e desautenticar o usuário
    this.isAuthenticated.next(false);
  }

  getIsAuthenticated() {
    return this.isAuthenticated.asObservable();
  }
  isLoggedIn() {
    return this.isAuthenticated.value;
  }
}
