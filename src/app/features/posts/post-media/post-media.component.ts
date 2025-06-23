import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-media',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-media.component.html',
  styleUrls: ['./post-media.component.css'],
})
export class PostMediaComponent {
  @Input() imageUrl!: string;

  isVideo(url: string): boolean {
    const videoExtensions = ['.mp4', '.webm', '.ogg'];
    return videoExtensions.some(ext => url?.toLowerCase().endsWith(ext));
  }
}


