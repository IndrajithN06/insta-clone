import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Like } from '../../../DTOs/postDto';

@Component({
  selector: 'app-post-actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-actions.component.html',
  styleUrls: ['./post-actions.component.css'],
})
export class PostActionsComponent {
  @Input() likes: Like[] = [];

  toggleLike(): void {
    // Placeholder logic
    alert('Toggled Like!');
  }
}
