import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  styleUrls: ['./projects.css']
})
export class Projects implements OnInit {
  selectedCategory = 'all';
  selectedProject: Project | null = null;
  sidePanelOpen = false;
  currentScreenshot = 0;

  categories = [
    { id: 'all', name: 'All Projects', icon: 'grid' },
    { id: 'web', name: 'Web Applications', icon: 'monitor' },
    { id: 'mobile', name: 'Mobile Apps', icon: 'smartphone' },
    { id: 'dashboard', name: 'Dashboards', icon: 'bar-chart' },
    { id: 'ecommerce', name: 'E-Commerce', icon: 'shopping-cart' }
  ];

  projects: Project[] = [
    {
      id: 1,
      title: 'AI-Powered Analytics Dashboard',
      shortDescription: 'Real-time business intelligence platform with machine learning insights',
      fullDescription: 'A comprehensive analytics platform that leverages AI to provide actionable business insights. Features include predictive analytics, automated reporting, and customizable dashboards with real-time data visualization.',
      category: 'dashboard',
      technologies: ['Angular', 'D3.js', 'Python', 'TensorFlow', 'PostgreSQL', 'Redis'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      screenshots: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200',
        'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200'
      ],
      featured: true,
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      completedDate: 'Dec 2024',
      duration: '6 months',
      team: '5 developers',
      role: 'Lead Frontend Developer',
      metrics: {
        users: '50K+ Active Users',
        performance: '98/100 Lighthouse Score',
        rating: '4.9/5.0 User Rating',
        impact: '40% Efficiency Increase'
      },
      challenges: [
        'Handling real-time data from multiple sources',
        'Optimizing performance with large datasets',
        'Creating intuitive data visualizations'
      ],
      solutions: [
        'Implemented WebSocket connections for real-time updates',
        'Used virtual scrolling and data pagination',
        'Designed interactive charts with D3.js'
      ],
      features: [
        'Real-time data visualization',
        'AI-powered predictive analytics',
        'Customizable dashboards',
        'Automated report generation',
        'Multi-user collaboration',
        'Export to PDF/Excel'
      ]
    },
    {
      id: 2,
      title: 'E-Commerce Platform',
      shortDescription: 'Full-featured marketplace with payment integration and inventory management',
      fullDescription: 'Modern e-commerce solution with advanced features including real-time inventory management, multiple payment gateways, AI-powered product recommendations, and comprehensive admin dashboard.',
      category: 'ecommerce',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redis', 'AWS'],
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
      screenshots: [
        'https://images.unsplash.com/photo-1557821552-17105176677c?w=1200',
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200',
        'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200'
      ],
      featured: true,
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      completedDate: 'Nov 2024',
      duration: '8 months',
      team: '7 developers',
      role: 'Full Stack Developer',
      metrics: {
        users: '100K+ Monthly Visitors',
        performance: '95/100 Lighthouse Score',
        rating: '4.7/5.0 Customer Rating',
        impact: '$2M+ Annual Revenue'
      },
      challenges: [
        'Scaling for high traffic during sales',
        'Securing payment transactions',
        'Managing complex inventory system'
      ],
      solutions: [
        'Implemented microservices architecture',
        'Used PCI-DSS compliant payment processing',
        'Built real-time inventory tracking system'
      ],
      features: [
        'Multi-vendor marketplace',
        'Advanced product search & filters',
        'Wishlist and cart management',
        'Multiple payment methods',
        'Order tracking',
        'Customer reviews and ratings',
        'Admin analytics dashboard',
        'Email notifications'
      ]
    },
    {
      id: 3,
      title: 'Social Media Management Tool',
      shortDescription: 'Unified platform for managing multiple social media accounts',
      fullDescription: 'Comprehensive social media management platform that allows businesses to schedule posts, analyze engagement metrics, and manage multiple accounts from a single dashboard.',
      category: 'web',
      technologies: ['Vue.js', 'Express', 'PostgreSQL', 'Bull Queue', 'Chart.js'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      screenshots: [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200'
      ],
      featured: true,
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      completedDate: 'Oct 2024',
      duration: '5 months',
      team: '4 developers',
      role: 'Frontend Lead',
      metrics: {
        users: '25K+ Active Users',
        performance: '96/100 Lighthouse Score',
        rating: '4.8/5.0 User Rating',
        impact: '60% Time Saved'
      },
      features: [
        'Multi-account management',
        'Post scheduling',
        'Analytics and reporting',
        'Team collaboration',
        'Content calendar',
        'Engagement tracking'
      ]
    },
    {
      id: 4,
      title: 'Fitness Tracking Mobile App',
      shortDescription: 'Cross-platform fitness app with workout plans and nutrition tracking',
      fullDescription: 'Mobile application for fitness enthusiasts featuring personalized workout plans, nutrition tracking, progress analytics, and community features.',
      category: 'mobile',
      technologies: ['React Native', 'Firebase', 'Node.js', 'MongoDB'],
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop',
      screenshots: [
        'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200'
      ],
      featured: false,
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      completedDate: 'Sep 2024',
      duration: '4 months',
      team: '3 developers',
      role: 'Mobile Developer',
      metrics: {
        users: '15K+ Downloads',
        performance: '4.5/5.0 App Store Rating',
        impact: '80% User Retention'
      },
      features: [
        'Personalized workout plans',
        'Nutrition tracking',
        'Progress analytics',
        'Social features',
        'Wearable device integration'
      ]
    },
    {
      id: 5,
      title: 'Project Management System',
      shortDescription: 'Collaborative project management tool with agile workflow support',
      fullDescription: 'Enterprise-grade project management platform designed for agile teams with features like sprint planning, task management, time tracking, and team collaboration.',
      category: 'web',
      technologies: ['Angular', 'NestJS', 'PostgreSQL', 'WebSocket', 'Docker'],
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
      screenshots: [
        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200'
      ],
      featured: false,
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      completedDate: 'Aug 2024',
      duration: '7 months',
      team: '6 developers',
      role: 'Full Stack Developer',
      metrics: {
        users: '30K+ Teams',
        performance: '94/100 Lighthouse Score',
        rating: '4.6/5.0 User Rating'
      },
      features: [
        'Kanban & Scrum boards',
        'Sprint planning',
        'Time tracking',
        'Gantt charts',
        'Real-time collaboration',
        'Custom workflows'
      ]
    },
    {
      id: 6,
      title: 'Healthcare Portal',
      shortDescription: 'Patient management system with telemedicine capabilities',
      fullDescription: 'Comprehensive healthcare platform connecting patients with doctors, featuring appointment scheduling, video consultations, medical records management, and prescription tracking.',
      category: 'web',
      technologies: ['React', 'Node.js', 'MongoDB', 'WebRTC', 'AWS'],
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
      screenshots: [
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200'
      ],
      featured: false,
      liveUrl: 'https://example.com',
      completedDate: 'Jul 2024',
      duration: '9 months',
      team: '8 developers',
      role: 'Senior Developer',
      metrics: {
        users: '40K+ Patients',
        rating: '4.9/5.0 User Rating',
        impact: 'HIPAA Compliant'
      },
      features: [
        'Video consultations',
        'Appointment scheduling',
        'Medical records',
        'Prescription management',
        'Lab results',
        'Insurance integration'
      ]
    }
  ];

  ngOnInit() {
    // Initialize component
  }

  get filteredProjects(): Project[] {
    if (this.selectedCategory === 'all') {
      return this.projects;
    }
    return this.projects.filter(p => p.category === this.selectedCategory);
  }

  selectCategory(categoryId: string) {
    this.selectedCategory = categoryId;
  }

  openProjectDetails(project: Project) {
    this.selectedProject = project;
    this.currentScreenshot = 0;
    this.sidePanelOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeProjectDetails() {
    this.sidePanelOpen = false;
    document.body.style.overflow = 'auto';
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

  @HostListener('document:keydown', ['$event'])
  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.sidePanelOpen) {
      this.closeProjectDetails();
    }
    if (this.sidePanelOpen) {
      if (event.key === 'ArrowRight') {
        this.nextScreenshot();
      }
      if (event.key === 'ArrowLeft') {
        this.prevScreenshot();
      }
    }
  }
}