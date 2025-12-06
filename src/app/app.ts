import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink,RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('THARUKA');
}
