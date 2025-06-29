import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Story} from '../Models/story'; // Adjust the import path as necessary
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  private apiUrl = `${environment.apiUrl}/api/Story`;

  constructor(private http: HttpClient) {}

uploadStory(formData: FormData): Observable<any> {
  return this.http.post(this.apiUrl, formData); // or use full Cloudinary URL if doing direct
}


  getActiveStories(): Observable<Story[]> {
    return this.http.get<Story[]>(this.apiUrl);
  }
}
