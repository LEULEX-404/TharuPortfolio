import { Component, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements OnDestroy {
  isScrolled = false;
  isMobileMenuOpen = false;
  activeSection = 'home';
  scrollProgress = 0;

  private readonly sectionIds = ['home', 'projects', 'skills', 'about', 'contact'];

  menuItems = [
    { label: '/home', section: 'home' },
    { label: '/work', section: 'projects' },
    { label: '/skills', section: 'skills' },
    { label: '/experience', section: 'about' },
    { label: '/contact', section: 'contact' }
  ];

  ngOnDestroy() {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    this.isScrolled = scrollPosition > 12;

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollProgress = docHeight > 0 ? Math.min(100, (scrollPosition / docHeight) * 100) : 0;

    const marker = scrollPosition + window.innerHeight * 0.35;

    for (const sectionId of this.sectionIds) {
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

  @HostListener('document:keydown', ['$event'])
  handleKeyboardNavigation(event: KeyboardEvent) {
    if (typeof window === 'undefined') return;

    if (event.ctrlKey || event.metaKey) {
      const key = event.key.toLowerCase();
      const index = parseInt(key) - 1;

      if (index >= 0 && index < this.sectionIds.length) {
        event.preventDefault();
        this.scrollToSection(this.sectionIds[index]);
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
    const header = document.querySelector('.site-nav');

    if (this.isMobileMenuOpen && header && !header.contains(target)) {
      this.closeMobileMenu();
    }
  }
}
