import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../Auth/auth.service';
import { LoginDto } from '../../../DTOs/LoginDto'; // Import LoginDto

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    console.log("Login Component Loaded");

    // Initialize the form group
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      // Create a new instance of LoginDto
      const loginDto: LoginDto = { username, password };
      console.log(loginDto)

      this.authService.login(loginDto).subscribe(
        response => {
          console.log('Login successful', response);
        //  alert('Login successful')
          localStorage.setItem('token', response.token);
        localStorage.setItem('username', username);

        // ✅ Navigate to profile route using username
        // this.router.navigate(['/profile', username]);
        this.router.navigate(['/home']);
        },
        error => {
          console.error('Login failed', error);
          alert('Login failed');
          // Optionally, show an error message or alert
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
