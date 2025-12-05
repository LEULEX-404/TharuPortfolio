import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  activeModal: string | null = null;

  openModal(modalId: string): void {
    this.activeModal = modalId;
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  }

  closeModal(event: Event): void {
    this.activeModal = null;
    // Restore body scroll when modal is closed
    document.body.style.overflow = 'auto';
  }

}
