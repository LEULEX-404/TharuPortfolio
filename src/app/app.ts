import { Component } from '@angular/core';
import { Home } from './components/home/home';
import { About } from './components/about/about';
import { Skills } from './components/skills/skills';
import { Projects } from './components/projects/projects';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, Home, About, Skills, Projects, Footer],
  template: `
    <div class="app-wrapper">
      <app-header></app-header>
      <main class="main-content">
        <app-home></app-home>
        <app-projects></app-projects>
        <app-skills></app-skills>
        <app-about></app-about>
      </main>
      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .app-wrapper {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .main-content {
      flex: 1;
      position: relative;
      z-index: 1;
    }
  `]
})
export class App {
  title = 'Portfolio 2025';
}