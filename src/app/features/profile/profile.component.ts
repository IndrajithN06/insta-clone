import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileService } from './profile.service';
import { UserProfile } from '../../Models/user-profile';
import { UpdateProfileDto } from '../../DTOs/UpdateProfileDto';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../Auth/auth.service';
import { ProfileStatsDto } from '../../DTOs/profile-stats.dto';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
   baseUrl:string = "https://localhost:7038";
  user: UserProfile | null = null;
  defaultProfilePic = 'assets/images/';
  updateData: UpdateProfileDto = {
    bio: '',
    profilePictureUrl: ''
  };
  isEditing = false;
  previewUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  stats:ProfileStatsDto = {
    followersCount: 0,                  
    followingCount: 0,
    postsCount: 0
  };
  // Injecting services

  constructor(private profileService: ProfileService,private route:ActivatedRoute,private cdRef: ChangeDetectorRef,private authservice:AuthService) {}

  ngOnInit(): void {
   
  const username = this.authservice.getUsernameFromToken(); // You can fetch from route param or auth token
    this.profileService.getUserProfile(username).subscribe({
      next: (data) => {
         console.log("ngOnInit of profile called",data);
        this.user = data;
        this.updateData.bio = data.bio;
        this.updateData.profilePictureUrl = data.profilePictureUrl;

         this.profileService.getProfileStats(data.id).subscribe({
          next: (statsData) => {
            this.stats = statsData;
          },
          error: (err) => console.error('Failed to fetch stats', err)
        });
      }
    });
  }

  // Handle file selection and preview
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      // Preview the selected image
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  // Update profile data
  updateProfile(): void {
    const formData = new FormData();
    formData.append('bio', this.updateData.bio);  // Ensure this is the correct field name for the bio
    if (this.selectedFile) {
      formData.append('profilePicture', this.selectedFile, this.selectedFile.name);
    }
formData.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});

    this.profileService.updateProfile(formData).subscribe({
      
      next: (response) => {
        console.log(response); 
    
if (this.user) {
  this.user.bio = this.updateData.bio;
  this.user.profilePictureUrl = `${this.baseUrl}/${response.profilePictureUrl}?t=${new Date().getTime()}`;
}

    
      
        this.cdRef.detectChanges();
        this.isEditing = false;
        this.previewUrl = '';
      },
      error: (err) => {
        console.error('Error updating profile:', err);
        alert('Failed to update profile.');
      }
    });
    
   
  }
}
