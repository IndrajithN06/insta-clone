import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ConversationDto, CreateMessageDto, MarkReadDto, MessageDto } from '../model/message.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root' // standalone
})
export class MessageService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/api/messages`;

  getConversations(userId: number|null): Observable<ConversationDto[]> {
    return this.http.get<ConversationDto[]>(`${this.baseUrl}/conversations/${userId}`);
  }

  getMessages(conversationId: number): Observable<MessageDto[]> {
    return this.http.get<MessageDto[]>(`${this.baseUrl}/${conversationId}`);
  }

  sendMessage(dto: CreateMessageDto): Observable<MessageDto> {
    return this.http.post<MessageDto>(this.baseUrl, dto);
  }

  markAsRead(dto: MarkReadDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/mark-read`, dto);
  }

  getFollowedUsers(userId: number): Observable<any[]> {
  return this.http.get<any[]>(`${environment.apiUrl}/api/users/${userId}/followed`);
}

GetFollowers(username: string): Observable<any[]> {
  return this.http.get<any[]>(`${environment.apiUrl}/api/user/${username}/followers`);  
}

GetFollowing(username: string|null): Observable<any[]> {
  return this.http.get<any[]>(`${environment.apiUrl}/api/user/${username}/following`);  
} 

}