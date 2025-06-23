import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { LoginDto } from '../DTOs/LoginDto';
import { RegisterDto } from '../DTOs/RegisterDto';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl='https://localhost:7038/api/Auth'

  constructor(private http:HttpClient) { }

  login(loginDto: LoginDto):Observable<any>{
   return this.http.post(`${this.apiUrl}/login`,loginDto)
  }

  register(registerDto:RegisterDto):Observable<any>{
  return this.http.post(`${this.apiUrl}/register`,registerDto)
  }



getUsernameFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken?.unique_name || null;
    } catch (err) {
      console.error('Token decoding failed', err);
      return null;
    }
  }

  getUserIdFromToken(): number | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decodedToken: any = jwtDecode(token);
      return parseInt(decodedToken?.nameid) || null;
    } catch (err) {
      console.error('Token decoding failed', err);
      return null;
    }
  }

}
