import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { MessageDto } from '../DTOs/ConversationDto';
import { BehaviorSubject } from 'rxjs';
import { CreateMessageDto } from '../features/message/model/message.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatSignalRService {
  private hubConnection!: signalR.HubConnection;
  private messageReceivedSource = new BehaviorSubject<MessageDto | null>(null);
  public messageReceived$ = this.messageReceivedSource.asObservable();

  startConnection(userId: number) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.apiUrl}/chathub`, {
        accessTokenFactory: () => localStorage.getItem('token') || '' // if you use JWT auth, return token here
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('SignalR connected');
      })
      .catch((err) => console.error('SignalR connection error:', err));

    this.hubConnection.on('ReceiveMessage', (message: MessageDto) => {
      console.log('New SignalR message:', message);
      this.messageReceivedSource.next(message);
    });
  }
    sendMessage(dto: CreateMessageDto) {
    this.hubConnection.invoke('SendMessage', dto).catch(err => {
      console.error('SendMessage failed:', err); 
    });
  }

  stopConnection() {
    if (this.hubConnection) {
      this.hubConnection.stop().then(() => console.log('SignalR disconnected'));
    }
  }
}
