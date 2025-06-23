import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, Input, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './sidebar-message.component.html',
  styleUrls: ['./sidebar-message.component.css']
})
export class SidebarComponent {
  @Input() username!: string|null;
  @Input() messages!: any[];
  @Output() chatSelected = new EventEmitter<any>();

  openChat(sender: any) {
    this.chatSelected.emit(sender);
  }
}
