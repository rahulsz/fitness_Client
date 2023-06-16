import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string;
  private emailKey = 'email';
  private passwordKey = 'password';
  private logoutSubject = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  getApiUrl(): string {
    return this.apiUrl;
  }

  isLoggedIn(): boolean {
    return this.getEmail() !== null && this.getPassword() !== null;
  }

  logout(): void {
    const email = this.getEmail();
  
    if (email) {
      // Send an HTTP request to update the status in the backend
      this.http.post(`${this.apiUrl}/logout`, { email }).subscribe(
        () => {
          // Logout successful
          console.log('Logout successful');
          // Additional code to handle successful logout
        },
        (error) => {
          // Error occurred during logout
          console.log('Error during logout:', error);
          // Additional code to handle error during logout
        }
      );
    }
  
    // Clear local storage
    localStorage.removeItem(this.emailKey);
    localStorage.removeItem(this.passwordKey);
    localStorage.setItem('status', JSON.stringify(false)); // Set status to true in local storage
  
    this.logoutSubject.next(true);
    this.router.navigateByUrl('/home');
  }
  

  private getEmail(): string | null {
    return localStorage.getItem(this.emailKey);
  }

  private getPassword(): string | null {
    return localStorage.getItem(this.passwordKey);
  }
}
