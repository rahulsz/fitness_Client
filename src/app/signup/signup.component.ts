import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  showPassword: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  save() {
    this.errorMessage = ''; // Clear the error message
  
      // Validate other required fields
      if (!this.username || !this.email || !this.password) {
        alert('Please fill in all required fields.');
        return;
      }

    // Validate email format
    if (!this.email || !this.email.includes('@gmail.com')) {
      alert('Please enter a valid Gmail address.');
      return;
    }
  
    // Validate password format
  
  
    this.userService.signup(this.username, this.email, this.password).subscribe(
      (resultData: any) => {
        if (resultData.includes('Employee with email')) {
          const errorMessage = resultData.split('Employee with email ')[1];
          alert(`Employee with email ${errorMessage} already exists`);
        } else if (resultData === 'Error occurred during employee registration') {
          alert('Error occurred during employee registration');
        } else {
          alert('Employee Registered Successfully');
          this.router.navigate(['/login']); // Redirect to the dashboard component
        }
      },
      (error: any) => {
        console.log(error);
        alert('Failed to register employee.');
      }
    );
  }
  


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  
  
}
