import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  status: boolean = false;
  showPassword: boolean = false;
  username: string = ''; // Add a new variable to store the username

  constructor(private router: Router, private userService: UserService) {}

  login() {
    console.log(this.email);
    console.log(this.password);
  
    this.userService.login(this.email, this.password).subscribe(
      (resultData: any) => {
        console.log(resultData);
        if (resultData.message === 'Email does not exist') {
          alert('Email does not exist');
        } else if (resultData.message === 'Login Success') {
          localStorage.setItem('email', this.email);
          localStorage.setItem('password', this.password);
          localStorage.setItem('status', JSON.stringify(true)); // Set status to true in local storage
  
          this.status = true;
          this.username = resultData.username; // Fetch the username from the response
  
          this.router.navigateByUrl('/dashboard');
        } else {
          alert('Incorrect Email and Password do not match');
        }
      },
      (error: any) => {
        console.error('Login failed', error);
      }
    );
  }
  
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
