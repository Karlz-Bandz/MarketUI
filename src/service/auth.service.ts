import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../environment/environment';
import { TokenService } from '../core/service/token.service';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.authApiUrl;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/users/login`, credentials)
      .pipe(tap(response => {
        this.tokenService.setToken(response.token);
      }));
  }

  register(user: { username: string; email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/users/register`, user);
  }

  logout() {
    this.tokenService.removeToken();
  }
}