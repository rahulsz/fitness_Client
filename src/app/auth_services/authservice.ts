import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  // Other authentication-related methods

  getApiUrl(): string {
    return environment.apiUrl; // Access the API URL from environment.ts
  }
}