import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { AuthResponse } from '../models/auth-response';
import { User } from '../models/user';
import { BROWSER_STORAGE } from './storage';

interface TokenPayload {
  email: string;
  name: string;
  exp: number;
}

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private readonly apiUrl = 'http://localhost:3000/api';
  private readonly tokenKey = 'travlr-token';

  constructor(
    private readonly http: HttpClient,
    @Inject(BROWSER_STORAGE) private readonly storage: Storage
  ) {}

  login(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, user).pipe(
      tap((response) => this.saveToken(response.token))
    );
  }

  register(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, user).pipe(
      tap((response) => this.saveToken(response.token))
    );
  }

  logout(): void {
    this.storage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    return this.storage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    const payload = this.getPayload();
    return payload !== null && payload.exp > Date.now() / 1000;
  }

  getCurrentUser(): { email: string; name: string } | null {
    const payload = this.getPayload();
    return payload ? { email: payload.email, name: payload.name } : null;
  }

  private saveToken(token: string): void {
    this.storage.setItem(this.tokenKey, token);
  }

  private getPayload(): TokenPayload | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    try {
      return JSON.parse(atob(token.split('.')[1])) as TokenPayload;
    } catch {
      this.logout();
      return null;
    }
  }
}
