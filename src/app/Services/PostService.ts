import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostDto} from '../DTOs/postDto'; // Adjust the import path as necessary


@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly apiUrl = 'https://localhost:7038/api/posts'; // Update with your actual backend URL

  constructor(private http: HttpClient) {}

  getPostById(id: number): Observable<PostDto> {
    return this.http.get<PostDto>(`${this.apiUrl}/${id}`);
  }

  getAllPosts(): Observable<PostDto[]> {
    return this.http.get<PostDto[]>(this.apiUrl);
  }

  createPost(post: any): Observable<PostDto> {
    return this.http.post<PostDto>(this.apiUrl, post);
  }

  updatePost(id: number, post: any): Observable<PostDto> {
    return this.http.put<PostDto>(`${this.apiUrl}/${id}`, post);
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
