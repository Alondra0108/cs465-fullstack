import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  credentials: User = { email: '', password: '' };
  message = '';

  constructor(
    private readonly auth: AuthenticationService,
    private readonly router: Router
  ) {}

  login(): void {
    this.message = '';
    this.auth.login(this.credentials).subscribe({
      next: () => this.router.navigate(['/']),
      error: (error) => {
        this.message = error.error?.message ?? 'Login failed. Please try again.';
      },
    });
  }
}
