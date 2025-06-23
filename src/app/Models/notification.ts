import { User } from './user'; // adjust path as needed

export interface Notification {
  id: number;
  userId: number;
  type: string; // e.g., 'like', 'comment', 'follow'
  entityId: number; // ID of the related entity (e.g., PostId, CommentId)
  createdAt: string; // or Date if you parse it
  isRead: boolean;

  user?: User;
}
