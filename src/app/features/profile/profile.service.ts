import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UpdateProfileDto } from '../../DTOs/UpdateProfileDto';
import { UserProfile } from '../../Models/user-profile';
import { ProfileStatsDto } from '../../DTOs/profile-stats.dto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = `${environment.apiUrl}/api/user`; // Adjust the API URL as needed

  constructor(private http: HttpClient) {}

  // Method to get user profile by username
  getUserProfile(username: string|null): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}/${username}`, {
      headers: this.getHeadersWithoutContentType(),
    });
  }

  // Method to update user profile
  updateProfile(formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-profile`, formData, {
      headers: this.getHeadersWithoutContentType(), 
    });
  }

  // src/app/features/profile/profile.service.ts
getProfileStats(userId: number) {
  return this.http.get<ProfileStatsDto>(`${this.apiUrl}/stats/${userId}`);
}

  
  private getHeadersWithoutContentType() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
      // No 'Content-Type' set here manually
    });
  }
}