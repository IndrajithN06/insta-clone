import { User } from './user';

export interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  text: string;
  createdAt: string; // or Date if you parse it
  isRead: boolean;

  sender?: User;
  receiver?: User;
}
