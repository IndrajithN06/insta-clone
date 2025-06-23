import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../Models/user';

@Component({
  selector: 'app-user-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css'],
})
export class UserHeaderComponent {
  @Input() user!: User;
  @Input() createdAt!: Date;
}
