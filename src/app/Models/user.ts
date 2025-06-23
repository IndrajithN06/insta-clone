
// Ensure the correct path to the 'follow' module
import { Follow } from './follow'; // adjust path as needed
import { Notification } from './notification'; // adjust path as needed
import { Message } from './message'; // adjust path as needed       
import { Story } from './story'; // adjust path as needed

export interface User {
    id: number;
    username: string;
    email: string;
    profilePictureUrl: string;
    bio?: string; // Optional because Bio is nullable
    createdAt: string; // or Date if you parse it
  
    // Collections can be handled as optional or excluded based on use case
  
    comments?: Comment[];
   
    followers?: Follow[];
    following?: Follow[];
    notifications?: Notification[];
    sentMessages?: Message[];
    receivedMessages?: Message[];
    stories?: Story[];
  }
  