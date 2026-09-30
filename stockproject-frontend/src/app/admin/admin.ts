import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin implements OnInit {
  users: any[] = [];
  showAddForm = false;

  newUser = {
    username: '',
    password: '',
    role: 'Staff'
  };

  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.authService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.error('Failed to load users:', err);
      }
    });
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    this.errorMessage = '';
    this.successMessage = '';
    this.newUser = { username: '', password: '', role: 'Staff' };
  }

  addUser(): void {
    if (!this.newUser.username || !this.newUser.password) {
      this.errorMessage = 'Username and password are required';
      return;
    }

    this.errorMessage = '';
    this.authService.register(this.newUser).subscribe({
      next: () => {
        this.successMessage = `User "${this.newUser.username}" created successfully!`;
        this.newUser = { username: '', password: '', role: 'Staff' };
        this.loadUsers();
        setTimeout(() => {
          this.successMessage = '';
          this.showAddForm = false;
        }, 2000);
      },
      error: (err) => {
        this.errorMessage = err.error || 'Failed to create user';
      }
    });
  }

  deleteUser(user: any): void {
    if (confirm(`Are you sure you want to delete user "${user.username}"?`)) {
      this.authService.deleteUser(user.id).subscribe({
        next: () => {
          this.loadUsers();
        },
        error: (err) => {
          console.error('Failed to delete user:', err);
        }
      });
    }
  }
}
