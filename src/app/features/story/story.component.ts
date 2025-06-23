import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoryService } from '../../Services/StoryService';
import { Story } from '../../Models/story'; // Adjust the import path as necessary  
import { StoryModalComponent } from '../../Modal.ts/story-modal/story-modal.component';       
import { MatDialog } from '@angular/material/dialog';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-story',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {
  @Input() username!: string|undefined;
  @Input() profilePictureUrl!: string|undefined;  
  @Input() storyUrl!: string;
  @Output() storyUploaded = new EventEmitter<void>();
  @Input() isCurrentUser: boolean = false;


  stories: Story[] = [];

  constructor(private storyService: StoryService,private dialog :MatDialog) {}

  ngOnInit(): void {
    console.log('StoryComponent loaded with:', this.storyUrl);
    
  }


  onFileSelected(event: any): void {
  const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('file', file);

  this.storyService.uploadStory(formData).subscribe({
    next: () => {
      this.storyUploaded.emit();  // 👈 Notify parent
    },
    error: () => alert('Upload failed')
  });
}


  openStory(storyUrl: string): void {
    this.dialog.open(StoryModalComponent, {
      data: { storyUrl },
      width: '600px'
    });
  }
}
