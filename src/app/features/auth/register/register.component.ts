import { Component } from '@angular/core';
import { AuthService } from '../../../Auth/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RegisterDto } from '../../../DTOs/RegisterDto';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterLink,MatProgressSpinnerModule],
templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true
})
export class RegisterComponent {
  // Explicitly define the form controls with the correct type
  registerForm: FormGroup;
  isLoading:boolean=false;
  

  constructor(private authService: AuthService) {
    // Initialize the form group with form controls and validation
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  // Register method
  onRegister() {
    if (this.registerForm.valid) {
      this.isLoading=true;
       const { username, password ,email} = this.registerForm.value;
       const registerDto: RegisterDto = { username, password,email };
      console.log('Registering with:', { username, password, email });
      this.authService.register(registerDto).subscribe(
        response => {
          console.log('Registration successful', response);
          alert('Registration Successful')
          this.isLoading=false;
          // Optionally, redirect to login page or home page
        },
        error => {
          console.error('Registration failed', error);
          this.isLoading=false;
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}
