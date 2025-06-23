import { User } from './user'; // adjust path as needed

export interface Story {
  id: number;
  userId: number;
  contentUrl: string;
  createdAt: string; // or Date if you parse it
  expiresAt: string; // or Date if you parse it

  user?: User;
}
