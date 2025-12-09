import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faHeadset, faJar, faBoxOpen, faHeartbeat, faGraduationCap, faCubes } from '@fortawesome/free-solid-svg-icons';

export interface Project {
  id: string;
  number: string;
  title: string;
  summary: string;
  description: string;
  icon: IconDefinition;
  techStack: string[];
  image: string;
  liveDemo?: string;
  sourceCode: string;
  features?: string[];
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  activeModal: string | null = null;

  projects: Project[] = [
    {
      id: 'modal1',
      number: '01',
      title: 'Customer Care System',
      summary: 'A system where customers raise and manage tickets, technicians resolve issues, managers oversee ticket activity and accounts, and admins handle announcements and system settings.',
      description: 'Customers can manage their profiles, create tickets for their issues, update or delete them, view replies from technicians, and read system announcements. Technicians handle and resolve raised tickets. Managers supervise ticket progress and account operations. Admins maintain announcements and system configurations..',
      icon: faHeadset,
      techStack: ['Java', 'MVC', 'MySQL'],
      image: 'assets/project1-image.jpg',
      liveDemo: 'https://demo.example.com',
      sourceCode: 'https://github.com/example/project1',
      features: [
        'Real-time collaboration with WebSocket',
        'Drag-and-drop task organization',
        'Advanced filtering and search',
        'Team management and permissions',
        'Mobile-responsive design'
      ]
    },
    {
      id: 'modal2',
      number: '02',
      title: 'Dairy Product Management System',
      summary: 'Full-featured e-commerce platform designed for small to medium-sized businesses.',
      description: 'A complete e-commerce solution with product management, shopping cart, secure payment processing, order tracking, and comprehensive admin dashboard. Integrated with Stripe for payment processing and AWS for scalable hosting.',
      icon: faJar,
      techStack: ['Next.js', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
      image: 'assets/project2-image.jpg',
      liveDemo: 'https://demo.example.com',
      sourceCode: 'https://github.com/example/project2',
      features: [
        'Product catalog with advanced search',
        'Secure payment integration',
        'Order management system',
        'Inventory tracking',
        'Customer analytics dashboard'
      ]
    },
    {
      id: 'modal3',
      number: '03',
      title: 'Gift Delivery Mobile App',
      summary: 'Modern chat application with instant messaging, file sharing, and video calls.',
      description: 'A feature-rich communication platform built with Firebase and React. Supports real-time messaging, file uploads, push notifications, voice and video calls, and end-to-end encryption for secure conversations.',
      icon: faBoxOpen,
      techStack: ['React', 'Firebase', 'WebRTC', 'Tailwind CSS', 'PWA'],
      image: 'assets/project3-image.jpg',
      liveDemo: 'https://demo.example.com',
      sourceCode: 'https://github.com/example/project3',
      features: [
        'Real-time messaging with Firebase',
        'File and media sharing',
        'Video and voice calls',
        'Push notifications',
        'End-to-end encryption'
      ]
    },
    {
      id: 'modal4',
      number: '04',
      title: 'Health Tracker Mobile App',
      summary: 'Award-winning portfolio website with stunning animations and smooth interactions.',
      description: 'A highly creative portfolio website featuring advanced GSAP animations, smooth scroll effects, 3D elements, and dynamic transitions. Optimized for performance and fully responsive across all devices.',
      icon: faHeartbeat,
      techStack: ['HTML5', 'CSS3', 'JavaScript', 'GSAP', 'Three.js'],
      image: 'assets/project4-image.jpg',
      liveDemo: 'https://demo.example.com',
      sourceCode: 'https://github.com/example/project4',
      features: [
        'Advanced GSAP animations',
        'Scroll-triggered effects',
        '3D interactive elements',
        'Optimized performance',
        'Fully responsive design'
      ]
    },
    {
      id: 'modal5',
      number: '05',
      title: 'Portfolio website',
      summary: 'Intelligent dashboard with machine learning insights and data visualization.',
      description: 'A sophisticated analytics platform leveraging AI and machine learning to provide actionable insights. Features real-time data processing, predictive analytics, custom reporting, and interactive visualizations.',
      icon: faGraduationCap,
      techStack: ['Python', 'TensorFlow', 'React', 'D3.js', 'FastAPI'],
      image: 'assets/project5-image.jpg',
      liveDemo: 'https://demo.example.com',
      sourceCode: 'https://github.com/example/project5',
      features: [
        'AI-powered predictions',
        'Real-time data processing',
        'Custom report generation',
        'Interactive visualizations',
        'Export capabilities'
      ]
    }
  ];

  openModal(modalId: string): void {
    this.activeModal = modalId;
    document.body.style.overflow = 'hidden';
  }

  closeModal(event: Event): void {
    this.activeModal = null;
    document.body.style.overflow = 'auto';
  }

  getProject(modalId: string): Project | undefined {
    return this.projects.find(p => p.id === modalId);
  }
}