

// DTOs (you can move these to separate files if needed)
export interface MessageDto {
  id: number;
  senderId: number;
  receiverId: number;
  text: string;
  createdAt: string;
  isRead: boolean;
}

export interface ConversationDto {
  id: number;
  user1Id: number;
  user2Id: number;
  messages: MessageDto[] ;
}

export interface CreateMessageDto {
  senderId: number;
  receiverId: number;
  text: string;
}

export interface MarkReadDto {
  conversationId: number;
  userId: number;
}
// src/app/Models/message.ts
export interface UserSummary {
  id: number;
  username: string;
  profilePictureUrl: string;
}


export interface Message {
  id: number;
  sender: UserSummary;    // not string anymore
  preview: MessageDto;
  time: string;
  unread: boolean;
}