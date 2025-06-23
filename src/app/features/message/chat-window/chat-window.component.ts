import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageDto, CreateMessageDto } from '../model/message.model';
import { MessageService } from '../service/message.service';
import { ChatSignalRService } from '../../../Services/chat-signalr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnChanges, OnDestroy {
  @Input() loggedInUserId!: number | null;
  @Input() user!: { id: number; username: string; profilePictureUrl: string };
  conversation: MessageDto[] = [];
  newMessageText = '';
  private messageSub!: Subscription;
  private connectionStarted = false;

  constructor(
    private messageService: MessageService,
    private signalRService: ChatSignalRService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && this.user && this.loggedInUserId) {
      this.loadConversation();

      if (!this.connectionStarted) {
        this.signalRService.startConnection(this.loggedInUserId);
        this.connectionStarted = true;

        this.messageSub = this.signalRService.messageReceived$.subscribe((message: MessageDto | null) => {
          if (!message) return;

          const isChatWithCurrentUser =
            (message.senderId === this.user.id && message.receiverId === this.loggedInUserId) ||
            (message.senderId === this.loggedInUserId && message.receiverId === this.user.id);

          if (isChatWithCurrentUser) {
            this.conversation.push(message);
            setTimeout(() => this.scrollToBottom(), 0);
          }
        });
      }
    }
  }

  ngOnDestroy(): void {
    this.signalRService.stopConnection();
    if (this.messageSub) this.messageSub.unsubscribe();
  }

sendMessage() {
  const trimmed = this.newMessageText.trim();
  if (!trimmed || !this.loggedInUserId || !this.user?.id) return;

  const message: CreateMessageDto = {
    senderId: this.loggedInUserId,
    receiverId: this.user.id,
    text: trimmed,
  };

  this.signalRService.sendMessage(message);
  this.newMessageText = '';
}


  scrollToBottom() {
    const container = document.querySelector('.chat-history');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }

  loadConversation() {
    this.messageService.getConversations(this.user.id).subscribe(convos => {
      const target = convos.find(c =>
      (c.user1Id === this.loggedInUserId && c.user2Id === this.user.id) ||
      (c.user2Id === this.loggedInUserId && c.user1Id === this.user.id)
    );

    this.conversation = target?.messages || [];
      setTimeout(() => this.scrollToBottom(), 0);
    });
  }
}
