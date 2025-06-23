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
  messages?: MessageDto[];
}
