import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
  achievements: string[];
  type: 'work' | 'education' | 'award';
  image?: string;
  imageAlt?: string;
}

interface Stat {
  value: string;
  label: string;
  description: string;
  icon: string;
}

interface Interest {
  name: string;
  icon: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrls: ['./about.css']
})
export class About implements OnInit, AfterViewInit {
  stats: Stat[] = [
    {
      value: '5+',
      label: 'Projects Completed',
      description: 'Successfully delivered',
      icon: 'check-circle'
    },
    {
      value: '2+',
      label: 'Years Experience',
      description: 'In web development',
      icon: 'calendar'
    },
    {
      value: '10+',
      label: 'Happy Clients',
      description: 'Worldwide',
      icon: 'smile'
    },
    {
      value: '5+',
      label: 'Technologies',
      description: 'Mastered',
      icon: 'layers'
    }
  ];

  timeline: TimelineItem[] = [
    {
      year: '2022',
      title: 'Insurance Consultant',
      company: 'Arpico Insurance PLC',
      description: 'Worked as an Insurance Consultant, providing tailored insurance solutions to clients.',
      achievements: [
        'Advised clients on insurance policies',
        'Achieved highest sales in the region for Q4 2022'
      ],
      type: 'work'
    },
    {
      year: '2023',
      title: 'Diploma in Information Technology',
      company: 'ESOFT Metro Campus',
      description: 'Diploma certification in Information Technology',
      achievements: [
        'Passed with distinction',
        'Enhanced knowledge in software development'
      ],
      type: 'education'
    },
    {
      year: '2023',
      title: 'Dean\'s List Award',
      company: 'Sri Lanka Institute of Information Technology',
      description: 'Recognized for academic excellence in Software Engineering',
      achievements: [
        'Top 10% of the class',
        'Maintained a GPA of 3.7/4.0'
      ],
      type: 'award',
      image: '/images/2023.jpg',
      imageAlt: '2023 Dean\'s List award certificate'
    },
    {
      year: '2024',
      title: 'Dean\'s List Award',
      company: 'Sri Lanka Institute of Information Technology',
      description: 'Recognized for academic excellence in Software Engineering',
      achievements: [
        'Top 10% of the class',
        'Maintained a GPA of 3.8/4.0'
      ],
      type: 'award',
      image: '/images/2024.jpg',
      imageAlt: '2024 Dean\'s List award certificate'
    },
    {
      year: '2025',
      title: 'Dean\'s List Award',
      company: 'Sri Lanka Institute of Information Technology',
      description: 'Recognized for academic excellence in Software Engineering',
      achievements: [
        'Top 10% of the class',
        'Maintained a GPA of 3.7/4.0'
      ],
      type: 'award',
      image: '/images/2025.jpg',
      imageAlt: '2025 Dean\'s List award certificate'
    }
  ];

  interests: Interest[] = [
    { name: 'UI/UX Design', icon: 'palette' },
    { name: 'Gaming', icon: 'gaming' },
    { name: 'Music', icon: 'music' },
    { name: 'Mentoring', icon: 'users' },
    { name: 'Photography', icon: 'camera' },
    { name: 'Traveling', icon: 'map' }
  ];

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    // Component initialization
  }

  ngAfterViewInit() {
    this.initScrollAnimations();
    this.animateNumbers();
  }

  // 3D Card Tilt Effect
  onCardHover(event: MouseEvent) {
    const card = event.currentTarget as HTMLElement;
    card.style.transform = 'scale(1.02)';
  }

  onCardMove(event: MouseEvent) {
    const card = event.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  }

  onCardLeave(event: MouseEvent) {
    const card = event.currentTarget as HTMLElement;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
  }

  // Scroll-triggered animations
  private initScrollAnimations() {
    if (typeof IntersectionObserver === 'undefined') {
      const elements = this.elementRef.nativeElement.querySelectorAll(
        '.page-header, .identity-card, .bio-card, .stats-section, .timeline-section .section-header, .interests-section .section-header, .timeline-item, .reveal-text, .interest-card'
      );

      elements.forEach((element: Element) => element.classList.add('animate-in'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    // Observe timeline items
    const timelineItems = this.elementRef.nativeElement.querySelectorAll('.timeline-item');
    timelineItems.forEach((item: Element) => observer.observe(item));

    // Observe top-level section blocks
    const sectionBlocks = this.elementRef.nativeElement.querySelectorAll(
      '.page-header, .identity-card, .bio-card, .stats-section, .timeline-section .section-header, .interests-section .section-header'
    );
    sectionBlocks.forEach((block: Element) => observer.observe(block));

    // Observe reveal text
    const revealTexts = this.elementRef.nativeElement.querySelectorAll('.reveal-text');
    revealTexts.forEach((text: Element) => observer.observe(text));

    // Observe interest cards
    const interestCards = this.elementRef.nativeElement.querySelectorAll('.interest-card');
    interestCards.forEach((card: Element) => observer.observe(card));
  }

  // Animate stat numbers
  private animateNumbers() {
    const statValues = this.elementRef.nativeElement.querySelectorAll('.stat-value');
    
    statValues.forEach((stat: HTMLElement) => {
      const target = stat.getAttribute('data-value') || '0';
      const numericValue = parseInt(target.replace(/\D/g, '')) || 0;
      const suffix = target.replace(/[0-9]/g, '');
      
      let current = 0;
      const increment = numericValue / 50;
      const duration = 2000;
      const stepTime = duration / 50;

      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          stat.textContent = numericValue + suffix;
          clearInterval(timer);
        } else {
          stat.textContent = Math.floor(current) + suffix;
        }
      }, stepTime);
    });
  }
}