import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDto } from '../../../DTOs/postDto';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, PostComponent],
  templateUrl: './post-list.component.html',
})
export class PostListComponent {
  @Input() posts: PostDto[] = [];
}
