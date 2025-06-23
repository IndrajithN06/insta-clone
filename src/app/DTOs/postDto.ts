import { User } from '../Models/user';

export interface Tag {
  id: number;
  name: string;
}

export interface Like {
  id: number;
  user: User;
  createdAt: Date;
}

export interface Comment {
  id: number;
  content: string;
  user: User;
  createdAt: Date;
}

export interface PostDto {
  id: number;
  caption: string;
  contentUrl: string;
  createdAt: Date;
  user: User;
  likes: Like[];
  comments: Comment[];
  tags: Tag[];
}
