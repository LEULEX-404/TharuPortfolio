import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements OnInit, OnDestroy {
  isScrolled = false;
  isMobileMenuOpen = false;
  activeSection = 'home';
  theme: 'light' | 'dark' = 'dark';
  mouseX = 0;
  mouseY = 0;
  private animationFrame: number | null = null;

  menuItems = [
    { label: 'Home', section: 'home', icon: 'home' },
    { label: 'About', section: 'about', icon: 'user' },
    { label: 'Skills', section: 'skills', icon: 'code' },
    { label: 'Projects', section: 'projects', icon: 'briefcase' },
    { label: 'Contact', section: 'contact', icon: 'mail' }
  ];

  ngOnInit() {
    // Only run browser-specific code
    if (typeof window !== 'undefined') {
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

  closeMobileMenu() {
    if (!this.isMobileMenuOpen) {
      return;
    }

    this.isMobileMenuOpen = false;

    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  scrollToSection(sectionId: string, event?: Event) {
    event?.preventDefault();

    if (typeof document === 'undefined') {
      return;
    }

    this.closeMobileMenu();
    this.activeSection = sectionId;

    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const index = parseInt(key) - 1;

      if (index >= 0 && index < sections.length) {
        event.preventDefault();
        this.scrollToSection(sections[index]);
      }
    }

    if (event.key === 'Escape' && this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (typeof document === 'undefined') return;

    const target = event.target as HTMLElement;
    const header = document.querySelector('.header');

    if (this.isMobileMenuOpen && header && !header.contains(target)) {
      this.closeMobileMenu();
    }
  }

  @HostListener('window:scroll')
  onSectionScroll() {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    this.isScrolled = scrollPosition > 50;

    const sections = ['home', 'about', 'skills', 'projects', 'contact'];
    const marker = scrollPosition + window.innerHeight * 0.35;

    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);

      if (!element) {
        continue;
      }

      const top = element.offsetTop;
      const bottom = top + element.offsetHeight;

      if (marker >= top && marker < bottom) {
        this.activeSection = sectionId;
        return;
      }
    }
  }
}
