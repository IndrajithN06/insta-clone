import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeService } from '../../Services/HomeService';
import {StoryComponent} from '../story/story.component';  
import { StoryService } from '../../Services/StoryService';
import { Story } from '../../Models/story';
import { AuthService } from '../../Auth/auth.service';
import { PostListComponent } from '../posts/post-list/post-list.component';
import { PostService } from '../../Services/PostService';
import { PostDto } from '../../DTOs/postDto';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule,StoryComponent,PostListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  stories: Story[] = [];
  currentUserId: number | null = null;
  loggedInUserStory: Story |null = null;
  otherUserStories: Story[] = [];
  posts:PostDto[] = [];

  // posts:Post[] = [];
  // newComment: Comment = new Comment();

  
  constructor(private storyService: StoryService,private homeService:HomeService,private authService:AuthService,private postservice:PostService) {}
  // Sample data for demonstration
loadStories(): void {
  this.storyService.getActiveStories().subscribe({
    next: (data) => {
      this.stories = data;
      this.loggedInUserStory = this.stories.find(
        (s) => s.userId === this.currentUserId
      )||null;

      this.otherUserStories = this.stories.filter(
        (s) => s.userId !== this.currentUserId
      );
      console.log(this.stories);
    },
    error: (err) => {
      console.error('Error fetching stories:', err);
    }
  });
}

loadPosts(): void {
  this.postservice.getAllPosts().subscribe({
    next: (data) => {
      this.posts = data;
      console.log('Posts loaded:', this.posts);
    },
    error: (err) => {
      console.error('Error fetching stories:', err);
    }
  });
}

ngOnInit() {
  const userId = this.authService.getUserIdFromToken(); // you need to implement this method
  this.currentUserId = userId;
  this.loadStories();
  this.loadPosts();
}

}
