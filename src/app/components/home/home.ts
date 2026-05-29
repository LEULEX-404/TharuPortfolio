import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit, AfterViewInit, OnDestroy {
  profileImage = '/images/Profile-removedBG.png';

  currentRole = '';
  roles = [
    'Full Stack Developer',
    'UI/UX Designer',
    'Problem Solver',
    'Tech Innovator'
  ];
  currentRoleIndex = 0;
  isDeleting = false;
  private typeInterval: any;
  
  particleArray = Array(30).fill(0);
  mouseX = 0;
  mouseY = 0;

  private homeRevealObserver: IntersectionObserver | null = null;
  private scrollRevealEnabled = false;

  stats = [
    { value: '5+', label: 'Projects Completed', icon: 'briefcase' },
    { value: '2+', label: 'Years Experience', icon: 'clock' },
    { value: '10+', label: 'Happy Clients', icon: 'users' },
    { value: '100%', label: 'Client Satisfaction', icon: 'heart' }
  ];

  technologies = [
    {
      name: 'Angular',
      icon: 'angular',
      glow: 'linear-gradient(135deg, rgba(221, 0, 49, 0.22), rgba(196, 0, 47, 0.14))',
      iconBg: 'rgba(221, 0, 49, 0.12)',
      iconColor: '#dd0031'
    },
    {
      name: 'React',
      icon: 'react',
      glow: 'linear-gradient(135deg, rgba(97, 218, 251, 0.22), rgba(33, 161, 196, 0.14))',
      iconBg: 'rgba(97, 218, 251, 0.12)',
      iconColor: '#61dafb'
    },
    {
      name: 'Node.js',
      icon: 'node',
      glow: 'linear-gradient(135deg, rgba(51, 153, 51, 0.22), rgba(102, 204, 102, 0.14))',
      iconBg: 'rgba(51, 153, 51, 0.12)',
      iconColor: '#339933'
    },
    {
      name: 'TypeScript',
      icon: 'typescript',
      glow: 'linear-gradient(135deg, rgba(49, 120, 198, 0.22), rgba(35, 90, 151, 0.14))',
      iconBg: 'rgba(49, 120, 198, 0.12)',
      iconColor: '#3178c6'
    },
    {
      name: 'MongoDB',
      icon: 'mongodb',
      glow: 'linear-gradient(135deg, rgba(71, 162, 72, 0.22), rgba(0, 237, 100, 0.14))',
      iconBg: 'rgba(71, 162, 72, 0.12)',
      iconColor: '#47a248'
    },
    {
      name: 'AWS',
      icon: 'aws',
      glow: 'linear-gradient(135deg, rgba(255, 153, 0, 0.22), rgba(236, 114, 17, 0.14))',
      iconBg: 'rgba(255, 153, 0, 0.12)',
      iconColor: '#ff9900'
    }
  ];

  constructor(private cdr: ChangeDetectorRef, private elementRef: ElementRef) {}

  ngOnInit() {
    this.initMouseTracking();
    // Start typing immediately when component loads
    this.typeWriter();
  }

  ngAfterViewInit() {
    this.enableScrollRevealIfNeeded();
  }

  ngOnDestroy() {
    if (this.typeInterval) {
      clearInterval(this.typeInterval);
    }

    this.homeRevealObserver?.disconnect();
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.enableScrollRevealIfNeeded();
  }

  private enableScrollRevealIfNeeded() {
    if (this.scrollRevealEnabled || typeof window === 'undefined') {
      return;
    }

    if (window.scrollY <= 8) {
      return;
    }

    this.scrollRevealEnabled = true;
    this.initHomeRevealObserver();
  }

  private initHomeRevealObserver() {
    const elements = this.elementRef.nativeElement.querySelectorAll('.home-reveal');

    if (!elements.length) {
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      elements.forEach((element: Element) => element.classList.add('is-visible'));
      return;
    }

    this.homeRevealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -8% 0px'
      }
    );

    elements.forEach((element: Element) => this.homeRevealObserver?.observe(element));
  }

  typeWriter() {
    let charIndex = 0;
    let isTyping = true;
    
    this.typeInterval = setInterval(() => {
      const currentText = this.roles[this.currentRoleIndex];
      
      if (isTyping) {
        // Typing forward
        if (charIndex <= currentText.length) {
          this.currentRole = currentText.substring(0, charIndex);
          charIndex++;
          
          // When fully typed, wait then start deleting
          if (charIndex > currentText.length) {
            setTimeout(() => {
              isTyping = false;
            }, 2000);
          }
        }
      } else {
        // Deleting backward
        if (charIndex > 0) {
          charIndex--;
          this.currentRole = currentText.substring(0, charIndex);
        } else {
          // Move to next role
          this.currentRoleIndex = (this.currentRoleIndex + 1) % this.roles.length;
          isTyping = true;
          charIndex = 0;
        }
      }
      
      // Trigger change detection
      this.cdr.detectChanges();
    }, 100);
  }

  initMouseTracking() {
    if (typeof window !== 'undefined') {
      document.addEventListener('mousemove', (e) => {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        this.updateSpotlight();
      });
    }
  }

  updateSpotlight() {
    const spotlight = document.querySelector('.spotlight') as HTMLElement;
    if (spotlight) {
      spotlight.style.left = this.mouseX + 'px';
      spotlight.style.top = this.mouseY + 'px';
    }
  }

  downloadCV() {
    console.log('Downloading CV...');
    const link = document.createElement('a');
    link.href = 'CV/Tharuka(CV).pdf';
    link.download = 'Tharuka-CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  scrollToSection(sectionId: string) {
    if (typeof document === 'undefined') {
      return;
    }

    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  scrollToContact() {
    this.scrollToSection('contact');
  }

  navigateToProjects() {
    // In-page section navigation is handled in the template.
  }

  navigateToAbout() {
    // In-page section navigation is handled in the template.
  }

  navigateToSkills() {
    // In-page section navigation is handled in the template.
  }
}