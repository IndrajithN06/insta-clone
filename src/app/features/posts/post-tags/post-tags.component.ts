import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tag } from '../../../Models/tag';

@Component({
  selector: 'app-post-tags',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-tags.component.html',
})
export class PostTagsComponent {
  @Input() tags: Tag[] = [];
}
