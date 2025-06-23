import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDto } from '../../../DTOs/postDto';
import { PostActionsComponent } from '../post-actions/post-actions.component';
import { PostMediaComponent } from '../post-media/post-media.component';
import { PostCommentsComponent } from '../post-comments/post-comments.component';
import { UserHeaderComponent } from '../user-header/user-header.component';
import { PostTagsComponent } from '../post-tags/post-tags.component';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    CommonModule,
    PostActionsComponent,
    PostMediaComponent,
    PostCommentsComponent,
    UserHeaderComponent,
    PostTagsComponent,
  ],
  templateUrl: './post.component.html',
})
export class PostComponent {
  @Input() post!: PostDto;
}
