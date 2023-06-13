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

  constructor(private userService: UserService, private router: Router) {}

  save() {
    this.errorMessage = ''; // Clear the error message
  
    this.userService.signup(this.username, this.email, this.password).subscribe(
      (resultData: any) => {
        if (resultData.includes("Employee with email")) {
          const errorMessage = resultData.split("Employee with email ")[1];
          alert(`Employee with email ${errorMessage} already exists`);
        } else if (resultData === "Error occurred during employee registration") {
          alert("Error occurred during employee registration");
        } else {
          alert("Employee Registered Successfully");
          this.router.navigate(['/login']); // Redirect to the dashboard component
        }
      },
      (error: any) => {
        console.log(error);
        alert("Failed to register employee.");
      }
    );
  }
}
