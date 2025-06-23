import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comment } from '../../../DTOs/postDto';

@Component({
  selector: 'app-post-comments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.css'],
})
export class PostCommentsComponent {
  @Input() comments: Comment[] = [];
}
