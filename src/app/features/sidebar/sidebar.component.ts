import { Component, ElementRef, ViewChild, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { ProfileService } from '../../features/profile/profile.service';
import { AuthService } from '../../Auth/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isMoreMenuOpen = false;
  user = {
    profilePictureUrl: 'assets/images/default-profile.png' // fallback image
  };

  @ViewChild('popupRef') popupRef!: ElementRef;
  @ViewChild('moreButtonRef') moreButtonRef!: ElementRef;

  constructor(
    private router: Router,
    private elementRef: ElementRef,
    private profileService: ProfileService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const username = this.authService.getUsernameFromToken();
    if (username) {
      this.profileService.getUserProfile(username).subscribe({
        next: (data) => {
          this.user.profilePictureUrl = data.profilePictureUrl
            console.log('User profile loaded:', data);
        },
        error: (err) => {
          console.error('Failed to load profile picture', err);
        }
      });
    }
  }

  toggleMoreMenu() {
    this.isMoreMenuOpen = !this.isMoreMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const clickedInsidePopup = this.popupRef?.nativeElement.contains(target);
    const clickedOnButton = this.moreButtonRef?.nativeElement.contains(target);

    if (!clickedInsidePopup && !clickedOnButton) {
      this.isMoreMenuOpen = false;
    }
  }

  navigate(route: string) {
    this.router.navigate([`/${route}`]);
    this.isMoreMenuOpen = false;
  }

  toggleTheme() {
    this.isMoreMenuOpen = false;
  }

  switchAccount() {
    this.isMoreMenuOpen = false;
  }

  logout() {
    localStorage.removeItem('token');
    this.isMoreMenuOpen = false;
    this.router.navigate(['/login']);
  }

  notifications = 4;
}
