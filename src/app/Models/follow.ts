import { User } from './user'; // adjust path as needed

export interface Follow {
  id: number;
  followerId: number;
  followingId: number;
  createdAt: string; // or Date if you parse it

  follower?: User;
  following?: User;
}
