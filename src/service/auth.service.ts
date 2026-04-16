import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../environment/environment';
import { TokenService } from '../core/service/token.service';
import { BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { RegisterRequest } from '../model/register-request';

interface JwtPayload {
  scope: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.authApiUrl;

  private rolesSubject = new BehaviorSubject<string[]>([]);
  roles$ = this.rolesSubject.asObservable();

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  public initFromStorage() {
    const token = this.tokenService.getToken();
    if (token) {
      this.setRolesFromToken(token);
    }
  }

  public hasRole(role: string): boolean {
    return this.rolesSubject.value.includes(role);
  }

  private setRolesFromToken(token: string) {
    const decoded = this.decodeToken(token);

    let roles: string[] = [];

    if (decoded?.scope) {
      roles = decoded.scope
        .split(' ')
        .filter(r => r.startsWith('ROLE_'))
        .map(r => r.replace('ROLE_', ''));
    }

    this.rolesSubject.next(roles);
  }

  private decodeToken(token: string): JwtPayload | null {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded;
    } catch {
      return null;
    }
  }

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/users/login`, credentials)
      .pipe(tap(response => {
        this.tokenService.setToken(response.token);
        this.setRolesFromToken(response.token);
      }));
  }

  register(registerRequest: RegisterRequest) {
    return this.http.post(`${this.apiUrl}/users/register`, registerRequest);
  }

  logout() {
    this.tokenService.removeToken();
    this.rolesSubject.next([]);
  }
}