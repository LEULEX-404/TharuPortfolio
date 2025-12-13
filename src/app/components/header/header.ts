import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements OnInit {
  isScrolled = false;
  isMobileMenuOpen = false;
  activeRoute = '/';
  theme: 'light' | 'dark' = 'dark';

  menuItems = [
    { label: 'Home', path: '/', icon: 'home' },
    { label: 'About', path: '/about', icon: 'user' },
    { label: 'Skills', path: '/skills', icon: 'code' },
    { label: 'Projects', path: '/projects', icon: 'briefcase' }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.activeRoute = event.url;
        this.isMobileMenuOpen = false;
      });
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 20;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    // Implement theme switching logic
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardNavigation(event: KeyboardEvent) {
    if (event.ctrlKey || event.metaKey) {
      const key = event.key.toLowerCase();
      switch (key) {
        case '1':
          event.preventDefault();
          this.router.navigate(['/']);
          break;
        case '2':
          event.preventDefault();
          this.router.navigate(['/about']);
          break;
        case '3':
          event.preventDefault();
          this.router.navigate(['/skills']);
          break;
        case '4':
          event.preventDefault();
          this.router.navigate(['/projects']);
          break;
      }
    }
  }
}