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
    { id: 'mobile', name: 'Mobile Apps', icon: 'smartphone' }
  ];

  projects: Project[] = [
    {
      id: 1,
      title: 'Dairy Product HR Management Dashboard',
      shortDescription: 'The Dairy Product HR Management Dashboard is a centralized system designed to manage employee details, track attendance, and handle salary calculations efficiently. It helps HR staff streamline workforce operations, improve accuracy, and maintain organized employee records within the dairy product organization.',
      fullDescription:'The Dairy Product HR Management Dashboard is a comprehensive human resource management system developed specifically for a dairy product organization. The system simplifies and automates core HR activities such as employee management, attendance management, and salary management to ensure efficient workforce administration. The Employee Management module allows HR administrators to add, update, view, and remove employee records including personal details, job roles, departments, and employment status, ensuring all employee information is stored securely and can be accessed easily when required. The Attendance Management module records daily employee attendance, working hours, leaves, and absences, helping the organization monitor punctuality, manage shift-based work, and generate attendance reports essential for payroll processing. The Salary Management module calculates employee salaries based on attendance, basic salary, allowances, deductions, and overtime, ensuring accurate and timely salary processing while reducing manual errors. Overall, the Dairy Product HR Management Dashboard improves operational efficiency, transparency, and decision-making by providing a user-friendly interface and reliable HR data management tailored for the dairy product industry.',
      category: 'web',
      technologies: ['Node.js', 'React', 'MongoDB', 'HTML', 'CSS'],
      image: 'Projects/1.png',
      screenshots: [
        'Projects/1.1.png',
        'Projects/1.2.png',
        'Projects/1.3.png'
      ],
      featured: true,
      liveUrl: 'https://ruhunu-yoghurt.onrender.com',
      githubUrl: 'https://github.com/LEULEX-404/Ruhunu_Yoghurt',
      completedDate: 'Oct 2025',
      duration: '4 months',
      team: '5 developers',
      role: 'Full Stack Developer',
      metrics: {
        users: '10+ Active Users',
        performance: '98/100 Lighthouse Score',
        rating: '4.9/5.0 User Rating',
        impact: '40% Efficiency Increase'
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
      shortDescription: 'The Customer Care System is a web-based platform that allows users to raise support tickets and track replies, while technicians can respond to issues. Administrators can manage users and post announcements, and managers can oversee tickets and account management, ensuring smooth communication and efficient support workflow.',
      fullDescription: 'The Customer Care System is a comprehensive support management platform designed to streamline communication between users and the support team. Users can submit support tickets, track their status, and view responses from technicians, enabling faster issue resolution. Technicians can respond to tickets, update their status, and ensure timely solutions. Administrators have the ability to manage user accounts, add announcements, and oversee general system operations. Managers can monitor ticket progress, manage user roles, and handle account permissions, providing oversight and maintaining system integrity. Overall, the system improves customer support efficiency, ensures proper communication flow, and provides role-based access control for different levels of staff, making it an effective tool for managing organizational support operations.',
      category: 'web',
      technologies: ['Java', 'HTML', 'MySQL', 'MVC', 'CSS'],
      image: 'Projects/2.jpg',
      screenshots: [
        'Projects/2.1.png',
        'Projects/2.2.png',
        'Projects/2.3.png'
      ],
      featured: true,
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/Imogirl/Smart-Customer-Care-System',
      completedDate: 'April 2025',
      duration: '4 months',
      team: '4 developers',
      role: 'Full Stack Developer',
      metrics: {
        users: '10+ Monthly Visitors',
        performance: '95/100 Lighthouse Score',
        rating: '4.7/5.0 Customer Rating',
        impact: '50% Efficiency Increase'
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
        'Role-based access for users, admins, and managers',
        'Announcements and notifications for users',
        'User account management by admins',
        'Manager oversight for tickets and accounts',
        'Search and filter tickets',
        'Dashboard with ticket statistics and activity logs'
      ]      
    },
    {
      id: 3,
      title: 'POS System for Cake Shop',
      shortDescription: 'The POS System for Cake Shop is a point-of-sale application designed to manage sales, generate invoices, track stock, and analyze reports. It streamlines order processing, inventory management, and business analytics to improve efficiency and decision-making in a cake shop.',
      fullDescription: 'The POS System for Cake Shop is a comprehensive point-of-sale solution tailored for cake shops and small bakeries. The system allows cashiers and staff to process sales efficiently and generate accurate invoices for customers. The Stock Management module helps track inventory levels, update product quantities in real-time, and prevent stock shortages. The Report & Analysis module provides detailed insights into sales trends, revenue, and inventory usage, supporting data-driven business decisions. Overall, the system enhances operational efficiency, reduces manual errors, and provides an intuitive interface for managing daily shop operations, inventory, and sales reporting.',
      category: 'web',
      technologies: ['Node.js', 'Express', 'React', 'MongoDB'],
      image: 'Projects/3.jpg',
      screenshots: [
        'Projects/3.1.png',
        'Projects/3.2.png',
        'Projects/3.3.png'
      ],
      featured: true,
      liveUrl: 'https://cake-shop-mern-frontend.onrender.com/',
      githubUrl: 'https://github.com/LEULEX-404/Cake_Shop_MERN',
      completedDate: 'Dec 2025',
      duration: '1 months',
      team: '2 developers',
      role: 'Full Stack Developer',
      metrics: {
        users: '100+ Active Users',
        performance: '96/100 Lighthouse Score',
        rating: '4.8/5.0 User Rating',
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
        'Generate invoices for customer orders',
        'Manage stock and update inventory in real-time',
        'Analyze sales and inventory reports',
        'Track daily, weekly, and monthly revenue',
        'Manage multiple product categories',
        'User-friendly dashboard for staff and managers'
      ]      
    },
    {
      id: 4,
      title: 'Gift Delivering Mobile App',
      shortDescription: 'Cross-platform gift delivery app with real-time tracking and notifications',
      fullDescription: 'Mobile application for gift delivery services featuring real-time tracking, notifications, and user-friendly interface for customers.',
      category: 'mobile',
      technologies: ['Kotlin', 'Intents'],
      image: 'Projects/4.jpg',
      screenshots: [
        'Projects/4.1.png',
        'Projects/4.2.png',
        'Projects/4.3.png'
      ],
      featured: false,
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      completedDate: 'Aug 2025',
      duration: '1 months',
      team: '1 developers',
      role: 'Mobile Developer',
      metrics: {
        users: '5+ Users',
        performance: '4.5/5.0 App Store Rating',
        impact: '80% User Retention'
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
      id: 5,
      title: 'Health Tracker Mobile App',
      shortDescription: 'Cross-platform health tracking application with real-time data synchronization',
      fullDescription: 'Mobile application for health tracking and monitoring, featuring real-time data synchronization, user-friendly interface, and comprehensive health analytics.',
      category: 'mobile',
      technologies: ['Kotlin', 'Intents', 'SharedPreferences'],
      image: 'Projects/5.jpg',
      screenshots: [
        'Projects/5.1.png',
        'Projects/5.2.png',
        'Projects/5.3.png'
      ],
      featured: false,
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      completedDate: 'Sep 2025',
      duration: '1 months',
      team: '1 developers',
      role: 'Mobile Developer',
      metrics: {
        users: '5+ Users',
        performance: '94/100 Lighthouse Score',
        rating: '4.6/5.0 User Rating'
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
        'Real-time health data synchronization',
        'Comprehensive health analytics',
        'User profile management',
        'Health goal tracking'
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