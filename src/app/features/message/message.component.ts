import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';   
import { FormsModule } from '@angular/forms';
import {SidebarComponent} from './sidebar-message/sidebar-message.component';
import { MessageService } from './service/message.service'; 
import { ConversationDto } from './model/message.model';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { AuthService } from '../../Auth/auth.service';
import { UserSummary } from './model/message.model';

@Component({
  selector: 'app-message',
  imports: [CommonModule,FormsModule,SidebarComponent,ChatWindowComponent],
templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {
  messages:UserSummary[] = []; // Array to hold the messages
  conversation: ConversationDto[] = []; // Array to hold the conversation
  username: string|null = ''; // Placeholder for the username
  selectedUser: { id: number; username: string; profilePictureUrl: string } | null = null; // Placeholder for the selected user
  loggedInUserId: number|null = null; // Placeholder for the logged-in user ID

  constructor(private messageService: MessageService,private authService:AuthService) {}

  ngOnInit() {

    this.username= this.authService.getUsernameFromToken(); // Replace with the actual username as needed
    this.loggedInUserId=this.authService.getUserIdFromToken() // Replace with the actual conversation ID as needed
    this.messageService.GetFollowing(this.username).subscribe((data) => {
    this.messages = data;         
    });
    this.messageService.getConversations( this.loggedInUserId).subscribe((data) => {
      this.conversation = data;
    });
  }
}
