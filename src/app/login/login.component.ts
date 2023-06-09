import { HttpClient } from '@angular/common/http';
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

  constructor(private router: Router, private userService: UserService) {}

  login() {
    console.log(this.email);
    console.log(this.password);

    this.userService.login(this.email, this.password).subscribe(
      (resultData: any) => {
        console.log(resultData);
        if (resultData.message === 'Email not exists') {
          alert('Email does not exist');
        } else if (resultData.message === 'Login Success') {
          this.router.navigateByUrl('/home');
        } else {
          alert('Incorrect Email and Password do not match');
        }
      },
      (error: any) => {
        console.error('Login failed', error);
      }
    );
  }
}