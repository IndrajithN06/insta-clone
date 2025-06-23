import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class HomeService {
    private baseUrl: string = 'https://api.example.com'; // Replace with your API base URL

    constructor(private http: HttpClient) {}

    // Fetch posts for the home feed


    // Like a post
    likePost(postId: string): Observable<any> {
        return this.http.post(`${this.baseUrl}/posts/${postId}/like`, {});
    }

    // Fetch comments for a post
    getComments(postId: string): Observable<any> {
        return this.http.get(`${this.baseUrl}/posts/${postId}/comments`);
    }

    // Add a comment to a post
    addComment(postId: string, comment: string): Observable<any> {
        return this.http.post(`${this.baseUrl}/posts/${postId}/comments`, { comment });
    }
}