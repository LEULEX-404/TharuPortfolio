import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, style, transition, animate } from '@angular/animations';

interface Project {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  technologies: string[];
  image: string;
  screenshots: string[];
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;
  completedDate: string;
  duration: string;
  team: string;
  role: string;
  metrics?: {
    users?: string;
    performance?: string;
    rating?: string;
    impact?: string;
  };
  challenges?: string[];
  solutions?: string[];
  features: string[];
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('220ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 0 }))
      ])
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('340ms cubic-bezier(0.4, 0, 0.2, 1)', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('260ms cubic-bezier(0.4, 0, 0.2, 1)', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ]),
  ]
})
export class Projects implements OnInit, AfterViewInit, OnDestroy {
  private revealObserver?: IntersectionObserver;

  constructor(private elementRef: ElementRef) {}

  selectedProject: Project | null = null;
  sidePanelOpen = false;
  currentScreenshot = 0;

  projects: Project[] = [
    {
      id: 1,
      title: 'Dairy Product HR Management Dashboard',
      shortDescription: 'A centralized HR system automating employee records, attendance and payroll for a dairy organization — built with a 5-person team over four months.',
      fullDescription: 'The Dairy Product HR Management Dashboard is a comprehensive human resource management system developed specifically for a dairy product organization. The system simplifies and automates core HR activities such as employee management, attendance management, and salary management to ensure efficient workforce administration.',
      category: 'web',
      technologies: ['Node.js', 'React', 'MongoDB', 'HTML', 'CSS'],
      image: 'Projects/1.png',
      screenshots: ['Projects/1.1.png', 'Projects/1.2.png', 'Projects/1.3.png'],
      featured: true,
      liveUrl: 'https://ruhunu-yoghurt-imo.vercel.app/home',
      githubUrl: 'https://github.com/LEULEX-404/Ruhunu_Yoghurt',
      completedDate: 'Oct 2025',
      duration: '4 months',
      team: '5 developers',
      role: 'Full Stack Developer',
      metrics: {
        users: '10+ Active Users',
        performance: '98/100 Score',
        rating: '4.9/5.0',
        impact: '40% Efficiency'
      },
      challenges: [
        'Managing accurate employee and attendance records',
        'Handling salary calculations with multiple factors',
        'Ensuring easy navigation for HR administrators'
      ],
      solutions: [
        'Implemented structured employee and attendance data management',
        'Automated salary calculations based on attendance and payroll rules',
        'Designed a clean and user-friendly HR dashboard interface'
      ],
      features: [
        'Employee record management',
        'Attendance tracking and leave management',
        'Automated salary and payroll calculation',
        'User-friendly HR dashboard',
        'Reports generation for management',
        'Role-based access control'
      ]
    },
    {
      id: 2,
      title: 'Customer Care System',
      shortDescription: 'A support-ticket platform connecting users and technicians — queueing, role-based access and activity logs, built with Java and MySQL on an MVC stack.',
      fullDescription: 'The Customer Care System is a comprehensive support management platform designed to streamline communication between users and the support team. Users can submit support tickets, track their status, and view responses from technicians, enabling faster issue resolution.',
      category: 'web',
      technologies: ['Java', 'HTML', 'MySQL', 'MVC', 'CSS'],
      image: 'Projects/2.jpg',
      screenshots: ['Projects/2.1.png', 'Projects/2.2.png', 'Projects/2.3.png'],
      featured: true,
      githubUrl: 'https://github.com/Imogirl/Smart-Customer-Care-System',
      completedDate: 'Apr 2025',
      duration: '4 months',
      team: '4 developers',
      role: 'Full Stack Developer',
      metrics: {
        users: '10+ Visitors',
        performance: '95/100 Score',
        rating: '4.7/5.0',
        impact: '50% Efficiency'
      },
      challenges: [
        'Handling multiple support tickets simultaneously',
        'Ensuring timely responses from technicians',
        'Managing role-based access for users, admins, and managers'
      ],
      solutions: [
        'Implemented a ticket queue system to handle multiple requests efficiently',
        'Set up notification and tracking system for prompt technician responses',
        'Designed role-based access control to manage permissions for different staff levels'
      ],
      features: [
        'Raise and track support tickets',
        'Technician replies and ticket updates',
        'Role-based access control',
        'Announcements and notifications',
        'User account management',
        'Manager oversight dashboard',
        'Search and filter tickets',
        'Activity logs and statistics'
      ]
    },
    {
      id: 3,
      title: 'POS System for Cake Shop',
      shortDescription: 'Point-of-sale software for bakeries — real-time stock tracking, automated invoicing and sales analytics, shipped solo alongside one other developer in a month.',
      fullDescription: 'The POS System for Cake Shop is a comprehensive point-of-sale solution tailored for cake shops and small bakeries. The system allows cashiers and staff to process sales efficiently and generate accurate invoices for customers.',
      category: 'web',
      technologies: ['Node.js', 'Express', 'React', 'MongoDB'],
      image: 'Projects/3.jpg',
      screenshots: ['Projects/3.1.png', 'Projects/3.2.png', 'Projects/3.3.png'],
      featured: true,
      liveUrl: 'https://cake-shop-mern-frontend.onrender.com/',
      githubUrl: 'https://github.com/LEULEX-404/Cake_Shop_MERN',
      completedDate: 'Dec 2025',
      duration: '1 month',
      team: '2 developers',
      role: 'Full Stack Developer',
      metrics: {
        users: '100+ Active Users',
        performance: '96/100 Score',
        rating: '4.8/5.0',
        impact: '60% Time Saved'
      },
      challenges: [
        'Managing real-time stock updates during multiple sales',
        'Generating accurate invoices quickly at checkout',
        'Analyzing sales and inventory data efficiently'
      ],
      solutions: [
        'Implemented real-time stock tracking to prevent overselling',
        'Automated invoice generation with detailed itemization',
        'Built a reporting module to generate sales and inventory analytics'
      ],
      features: [
        'Generate invoices for orders',
        'Real-time stock management',
        'Sales and inventory reports',
        'Revenue tracking',
        'Product categories',
        'User-friendly dashboard'
      ]
    },
    {
      id: 4,
      title: 'PulseNova — Health Tracker & Wellness Platform',
      shortDescription: 'An AI-assisted wellness dashboard: OpenAI-driven meal suggestions, a simulated wearable-data feed, and weekly health analytics on the MERN stack.',
      fullDescription: 'The AI-Powered Health Tracker & Wellness Platform is a full-stack health management system designed to help users monitor, analyze, and improve their lifestyle habits. It supports manual health data entry, PDF-based health report extraction, and a smart simulator that mimics wearable device data (e.g., Fitbit-like tracking) for testing and development purposes. The system also includes an AI-powered nutrition analyzer, personalized meal suggestions, reminder system, and advanced weekly/monthly health reporting dashboards for continuous wellness monitoring.',
      category: 'web',
      technologies: ['MERN Stack', 'React', 'Node.js', 'Express.js', 'MongoDB', 'OpenAI API', 'CSS'],
      image: 'Projects/6.png',
      screenshots: ['Projects/6.1.png', 'Projects/6.2.png', 'Projects/6.3.png', 'Projects/6.4.png'],
      featured: true,
      liveUrl: 'https://healthhracker.vercel.app/',
      githubUrl: 'https://github.com/LEULEX-404/Health_Tracker',
      completedDate: 'May 2026',
      duration: '3–5 months',
      team: '4 contributors',
      role: 'Full Stack Developer & AI Integration',
      metrics: {
        users: 'Demo Users / Testing Phase',
        performance: '95+ Lighthouse Score',
        rating: '4.8/5.0 (simulated feedback)',
        impact: 'Improved health tracking efficiency by 60%'
      },
      challenges: [
        'Integrating simulated wearable data for realistic testing',
        'Processing and extracting structured data from PDF health reports',
        'Generating accurate AI-based nutrition and meal recommendations',
        'Designing a unified dashboard for multiple health data sources'
      ],
      solutions: [
        'Built a custom health data simulator to emulate wearable device streams',
        'Implemented PDF parsing pipeline for structured health data extraction',
        'Integrated AI model for nutrition analysis and meal generation',
        'Designed modular dashboard architecture with real-time analytics panels'
      ],
      features: [
        'Manual health data entry (weight, calories, sleep, activity)',
        'PDF health report upload & extraction',
        'Wearable data simulator (Fitbit-like mock data generator)',
        'AI-powered nutrition analyzer',
        'Personalized AI meal recommendations',
        'Smart reminders for hydration, meals, and workouts',
        'Weekly & monthly health analytics reports',
        'Modern responsive dashboard UI',
        'Data visualization for trends and progress'
      ]
    },
    {
      id: 5,
      title: 'Gift Delivering Mobile App',
      shortDescription: 'A native Android app for gift delivery with real-time order tracking and push notifications, built solo in Kotlin.',
      fullDescription: 'Mobile application for gift delivery services featuring real-time tracking, notifications, and user-friendly interface for customers.',
      category: 'mobile',
      technologies: ['Kotlin', 'Android', 'Intents'],
      image: 'Projects/4.jpg',
      screenshots: ['Projects/4.1.png', 'Projects/4.2.png', 'Projects/4.3.png'],
      featured: false,
      completedDate: 'Aug 2025',
      duration: '1 month',
      team: '1 developer',
      role: 'Mobile Developer',
      metrics: {
        users: '5+ Users',
        rating: '4.5/5.0',
        impact: '80% Retention'
      },
      challenges: [
        'Implementing real-time order tracking',
        'Ensuring timely push notifications',
        'Creating an intuitive user interface'
      ],
      solutions: [
        'Integrated GPS tracking for real-time updates',
        'Set up push notification services for instant alerts',
        'Designed a clean and user-friendly mobile interface'
      ],
      features: [
        'Real-time order tracking',
        'Push notifications',
        'User profile management',
        'Order history'
      ]
    },
    {
      id: 6,
      title: 'Health Tracker Mobile App',
      shortDescription: 'A cross-device health-monitoring app with real-time sync and goal tracking, built solo in Kotlin.',
      fullDescription: 'Mobile application for health tracking and monitoring, featuring real-time data synchronization, user-friendly interface, and comprehensive health analytics.',
      category: 'mobile',
      technologies: ['Kotlin', 'Android', 'SharedPreferences'],
      image: 'Projects/5.jpg',
      screenshots: ['Projects/5.1.png', 'Projects/5.2.png', 'Projects/5.3.png'],
      featured: false,
      completedDate: 'Sep 2025',
      duration: '1 month',
      team: '1 developer',
      role: 'Mobile Developer',
      metrics: {
        users: '5+ Users',
        performance: '94/100 Score',
        rating: '4.6/5.0'
      },
      challenges: [
        'Implementing real-time health data synchronization',
        'Ensuring accurate health analytics',
        'Creating an intuitive user interface'
      ],
      solutions: [
        'Integrated cloud services for real-time data sync',
        'Developed algorithms for accurate health analytics',
        'Designed a clean and user-friendly mobile interface'
      ],
      features: [
        'Real-time health data sync',
        'Comprehensive health analytics',
        'User profile management',
        'Health goal tracking'
      ]
    }
  ];

  ngOnInit() {}

  ngAfterViewInit() {
    this.initScrollAnimations();
  }

  ngOnDestroy() {
    this.revealObserver?.disconnect();
  }

  private initScrollAnimations() {
    const root = this.elementRef.nativeElement as HTMLElement;

    if (typeof IntersectionObserver === 'undefined') {
      root.querySelectorAll('.section-head, .work-item')
        .forEach((element: Element) => element.classList.add('animate-in'));
      return;
    }

    this.revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          this.revealObserver?.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px'
    });

    root.querySelectorAll('.section-head').forEach((element: Element) => this.revealObserver?.observe(element));

    root.querySelectorAll('.work-item').forEach((item: Element, index: number) => {
      (item as HTMLElement).style.setProperty('--reveal-delay', `${index * 0.06}s`);
      this.revealObserver?.observe(item);
    });
  }

  openProjectDetails(project: Project) {
    this.selectedProject = project;
    this.currentScreenshot = 0;
    this.sidePanelOpen = true;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  closeProjectDetails() {
    this.sidePanelOpen = false;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'auto';
    }
    setTimeout(() => {
      this.selectedProject = null;
    }, 300);
  }

  nextScreenshot() {
    if (this.selectedProject && this.selectedProject.screenshots) {
      this.currentScreenshot = (this.currentScreenshot + 1) % this.selectedProject.screenshots.length;
    }
  }

  prevScreenshot() {
    if (this.selectedProject && this.selectedProject.screenshots) {
      this.currentScreenshot = this.currentScreenshot === 0
        ? this.selectedProject.screenshots.length - 1
        : this.currentScreenshot - 1;
    }
  }

  getMetricsArray(metrics: any): Array<{ key: string; value: string }> {
    return Object.keys(metrics).map(key => ({
      key: key.charAt(0).toUpperCase() + key.slice(1),
      value: metrics[key]
    }));
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.sidePanelOpen) {
      this.closeProjectDetails();
    }
    if (this.sidePanelOpen && this.selectedProject) {
      if (event.key === 'ArrowRight') {
        this.nextScreenshot();
      }
      if (event.key === 'ArrowLeft') {
        this.prevScreenshot();
      }
    }
  }
}
