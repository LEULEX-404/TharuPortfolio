import { Component, ElementRef, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css'],
})
export class Contact implements AfterViewInit {

  contacts = [
    { title: 'Email', description: 'Reach me via email', icon: '✉️', action: 'Send Email', link: 'mailto:tharuka@example.com' },
    { title: 'LinkedIn', description: 'Connect professionally', icon: '💼', action: 'Visit LinkedIn', link: 'https://www.linkedin.com/in/miyuru-tharuka-18a9b6412' },
    { title: 'GitHub', description: 'Check my repos', icon: '🐙', action: 'Visit GitHub', link: 'https://github.com/tharuka' }
  ];

  @ViewChildren('animateCard') animateCards!: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    if (typeof IntersectionObserver === 'undefined') {
      this.animateCards.forEach((card) => card.nativeElement.classList.add('animate-in'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    // Stagger animation
    this.animateCards.forEach((card, index) => {
      setTimeout(() => {
        observer.observe(card.nativeElement);
      }, index * 200); // 200ms stagger
    });
  }

  sendMessage(event: Event) {
    event.preventDefault();
    alert('Form submitted! (Integrate your backend here)');
  }

}
