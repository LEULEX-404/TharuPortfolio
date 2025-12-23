import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements OnInit, OnDestroy {
  isScrolled = false;
  isMobileMenuOpen = false;
  activeRoute = '/';
  theme: 'light' | 'dark' = 'dark';
  mouseX = 0;
  mouseY = 0;
  private animationFrame: number | null = null;
  private routerSub: Subscription | null = null;

  menuItems = [
    { label: 'Home', path: '/', icon: 'home' },
    { label: 'About', path: '/about', icon: 'user' },
    { label: 'Skills', path: '/skills', icon: 'code' },
    { label: 'Projects', path: '/projects', icon: 'briefcase' }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    // Only run browser-specific code
    if (typeof window !== 'undefined') {
      // Track active route
      this.routerSub = this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((event: any) => {
          this.activeRoute = event.url;
          this.isMobileMenuOpen = false;
        });

      // Apply saved theme
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
      if (savedTheme) {
        this.theme = savedTheme;
        document.documentElement.setAttribute('data-theme', savedTheme);
      }
    }
  }

  ngOnDestroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    this.routerSub?.unsubscribe();
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    if (typeof window === 'undefined') return;
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    this.isScrolled = scrollPosition > 50;
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (typeof window === 'undefined' || !('requestAnimationFrame' in window)) return;

    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);

    this.animationFrame = requestAnimationFrame(() => {
      this.mouseX = event.clientX;
      this.mouseY = event.clientY;
    });
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
    }
  }

  toggleTheme() {
    if (typeof window === 'undefined') return;
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', this.theme);
    localStorage.setItem('theme', this.theme);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardNavigation(event: KeyboardEvent) {
    if (typeof window === 'undefined') return;

    if (event.ctrlKey || event.metaKey) {
      const key = event.key.toLowerCase();
      const routes = ['/', '/about', '/skills', '/projects'];
      const index = parseInt(key) - 1;

      if (index >= 0 && index < routes.length) {
        event.preventDefault();
        this.router.navigate([routes[index]]);
      }
    }

    if (event.key === 'Escape' && this.isMobileMenuOpen) {
      this.toggleMobileMenu();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (typeof document === 'undefined') return;

    const target = event.target as HTMLElement;
    const header = document.querySelector('.header');

    if (this.isMobileMenuOpen && header && !header.contains(target)) {
      this.toggleMobileMenu();
    }
  }
}
