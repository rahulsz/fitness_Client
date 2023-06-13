import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  // Other authentication-related methods

  getApiUrl(): string {
    return environment.apiUrl; // Access the API URL from environment.ts
  }

  // Other authentication-related methods

  isLoggedIn(): boolean {
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    return email !== null && password !== null;
  }

  logout(): void {
    // Clear session, tokens, or any stored user data
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('status');

    // Redirect the user to the login page
    this.router.navigateByUrl('/home');
  }
}
