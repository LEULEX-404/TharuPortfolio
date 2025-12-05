import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  onCardHover(event: MouseEvent): void {
    const card = event.currentTarget as HTMLElement;
    const glow = card.querySelector('.card-glow') as HTMLElement;
    
    if (glow) {
      card.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        glow.style.left = `${x - glow.offsetWidth / 2}px`;
        glow.style.top = `${y - glow.offsetHeight / 2}px`;
      });
    }
  }

  onCardLeave(event: MouseEvent): void {
    const card = event.currentTarget as HTMLElement;
    const glow = card.querySelector('.card-glow') as HTMLElement;
    
    if (glow) {
      card.removeEventListener('mousemove', () => {});
    }
  }

}
