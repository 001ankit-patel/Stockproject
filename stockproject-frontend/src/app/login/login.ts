import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  username = '';
  password = '';
  role = 'Staff';
  errorMessage = '';
  successMessage = '';
  isLoading = false;
  isRegisterMode = false;

  constructor(private authService: AuthService, private router: Router) {}

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
    this.errorMessage = '';
    this.successMessage = '';
  }

  onSubmit() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter both username and password';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.isRegisterMode) {
      this.authService.register({ username: this.username, password: this.password, role: this.role }).subscribe({
        next: () => {
          this.isLoading = false;
          this.successMessage = 'Account created successfully! You can now sign in.';
          this.isRegisterMode = false;
          this.password = '';
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.error || 'Registration failed. Please try again.';
        }
      });
    } else {
      this.authService.login({ username: this.username, password: this.password }).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.error || 'Invalid username or password';
        }
      });
    }
  }
}
