import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth_services/authservice';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.apiUrl = this.authService.getApiUrl();
  }

  signup(username: string, email: string, password: string) {
    const bodyData = {
      username: username,
      email: email,
      password: password
    };
    return this.http.post(`${this.apiUrl}/signup`, bodyData, { responseType: 'text' });
  }

  login(email: string, password: string) {
    const bodyData = {
      email: email,
      password: password,
    };

    return this.http.post(`${this.apiUrl}/signin`, bodyData);
  }

  logout(email: string) {
    const bodyData = {
      email: email
    };
    return this.http.post(`${this.apiUrl}/logout`, bodyData);
  }
}
