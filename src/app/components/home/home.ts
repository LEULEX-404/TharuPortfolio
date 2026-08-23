import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit, AfterViewInit, OnDestroy {
  profileImage = '/images/Profile-removedBG-cropped.png';

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

  private homeRevealObserver: IntersectionObserver | null = null;

  stats = [
    {
      value: '5+',
      label: 'Projects completed',
      description: 'End-to-end web and mobile products shipped — from HR systems and POS platforms to AI-assisted health tools.'
    },
    {
      value: '2+',
      label: 'Years experience',
      description: 'Building production-grade applications with Angular, React and Node.js across freelance and team projects.'
    },
    {
      value: '10+',
      label: 'Happy clients',
      description: 'Trusted to deliver clean architecture, considered UI and code that is built to be maintained.'
    },
    {
      value: '4',
      label: 'Certifications earned',
      description: 'Continuously leveling up through certified coursework in full-stack development and modern JS frameworks.'
    }
  ];

  technologies = ['Angular', 'React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS', 'Express.js', 'Docker'];

  constructor(private cdr: ChangeDetectorRef, private elementRef: ElementRef) {}

  ngOnInit() {
    this.typeWriter();
  }

  ngAfterViewInit() {
    this.initHomeRevealObserver();
  }

  ngOnDestroy() {
    if (this.typeInterval) {
      clearInterval(this.typeInterval);
    }

    this.homeRevealObserver?.disconnect();
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
        if (charIndex <= currentText.length) {
          this.currentRole = currentText.substring(0, charIndex);
          charIndex++;

          if (charIndex > currentText.length) {
            setTimeout(() => {
              isTyping = false;
            }, 2000);
          }
        }
      } else {
        if (charIndex > 0) {
          charIndex--;
          this.currentRole = currentText.substring(0, charIndex);
        } else {
          this.currentRoleIndex = (this.currentRoleIndex + 1) % this.roles.length;
          isTyping = true;
          charIndex = 0;
        }
      }

      this.cdr.detectChanges();
    }, 100);
  }

  downloadCV() {
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
}
