import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Particle {
  x: number;
  delay: number;
}

interface ContactInfo {
  icon: string;
  title: string;
  value: string;
  link: string | null;
}

interface SocialLink {
  name: string;
  url: string;
  icon: string;
  color: string;
}

interface QuickLink {
  label: string;
  path: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class Footer implements OnInit {
  contactForm!: FormGroup;
  formStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  errorMessage = '';
  showScrollTop = false;
  currentYear = new Date().getFullYear();
  newsletterEmail = '';
  
  // Track focused fields
  focusedFields: Set<string> = new Set();

  // Floating particles for background effect
  particles: Particle[] = [];

  // Stats
  stats = {
    projects: 5,
    experience: 2,
    clients: 10
  };

  quickLinks: QuickLink[] = [
    { label: 'Home', path: 'home' },
    { label: 'About', path: 'about' },
    { label: 'Skills', path: 'skills' },
    { label: 'Projects', path: 'projects' },
    { label: 'Contact', path: 'contact' }
  ];

  services: string[] = [
    'Frontend Engineering',
    'Full Stack Apps',
    'API Integration',
    'Design Systems'
  ];

  socialLinks: SocialLink[] = [
    { 
      name: 'GitHub', 
      url: 'https://github.com/LEULEX-404', 
      icon: 'github',
      color: '#333'
    },
    { 
      name: 'LinkedIn', 
      url: 'https://www.linkedin.com/in/miyuru-tharuka-1b769a376', 
      icon: 'linkedin',
      color: '#0077b5'
    },
    { 
      name: 'Facebook', 
      url: 'https://web.facebook.com/TharukaFB', 
      icon: 'facebook',
      color: '#1da1f2'
    },
    { 
      name: 'Email', 
      url: 'mailto:miyurut20@gmail.com', 
      icon: 'mail',
      color: '#ea4335'
    }
  ];

  contactInfo: ContactInfo[] = [
    {
      icon: 'map-pin',
      title: 'Location',
      value: 'Kaduwela, Sri Lanka',
      link: null
    },
    {
      icon: 'mail',
      title: 'Email',
      value: 'miyurut20@gmail.com',
      link: 'mailto:miyurut20@gmail.com'
    },
    {
      icon: 'phone',
      title: 'Phone',
      value: '076-215-7137',
      link: 'tel:+94762157137'
    },
    {
      icon: 'globe',
      title: 'Website',
      value: 'www.tharuka.com',
      link: 'https://tharu-portfolio-123.vercel.app/'
    }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
    this.generateParticles();
    this.animateStats();
  }

  initializeForm() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]]
    });
  }

  generateParticles() {
    // Generate random particles for floating animation
    for (let i = 0; i < 20; i++) {
      this.particles.push({
        x: Math.random() * 100,
        delay: Math.random() * 15
      });
    }
  }

  animateStats() {
    // Animate stats counter on init
    const duration = 2000; // 2 seconds
    const steps = 50;
    const interval = duration / steps;

    const targets = { ...this.stats };
    this.stats = { projects: 0, experience: 0, clients: 0 };

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      
      this.stats.projects = Math.floor(targets.projects * progress);
      this.stats.experience = Math.floor(targets.experience * progress);
      this.stats.clients = Math.floor(targets.clients * progress);

      if (step >= steps) {
        this.stats = targets;
        clearInterval(timer);
      }
    }, interval);
  }

  get formControls() {
    return this.contactForm.controls;
  }

  async onSubmit() {
    if (this.contactForm.invalid) {
      Object.keys(this.formControls).forEach(key => {
        this.formControls[key].markAsTouched();
      });
      return;
    }

    this.formStatus = 'loading';
    this.errorMessage = '';

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate random success/error for demo (90% success rate)
      const success = Math.random() > 0.1;
      
      if (success) {
        this.formStatus = 'success';
        this.contactForm.reset();
        
        // Reset to idle after 5 seconds
        setTimeout(() => {
          this.formStatus = 'idle';
        }, 5000);
      } else {
        throw new Error('Failed to send message. Please try again.');
      }
    } catch (error: any) {
      this.formStatus = 'error';
      this.errorMessage = error.message || 'Something went wrong. Please try again.';
      
      // Reset error after 5 seconds
      setTimeout(() => {
        this.formStatus = 'idle';
        this.errorMessage = '';
      }, 5000);
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.formControls[fieldName];
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  isFieldFocused(fieldName: string): boolean {
    return this.focusedFields.has(fieldName);
  }

  onFieldFocus(fieldName: string) {
    this.focusedFields.add(fieldName);
  }

  onFieldBlur(fieldName: string) {
    this.focusedFields.delete(fieldName);
  }

  getFieldError(fieldName: string): string {
    const field = this.formControls[fieldName];
    if (field?.errors) {
      if (field.errors['required']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
      }
      if (field.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (field.errors['minlength']) {
        return `Minimum ${field.errors['minlength'].requiredLength} characters required`;
      }
      if (field.errors['maxlength']) {
        return `Maximum ${field.errors['maxlength'].requiredLength} characters allowed`;
      }
    }
    return '';
  }

  getCharCount(): number {
    return this.contactForm.get('message')?.value?.length || 0;
  }

  subscribeNewsletter() {
    if (this.newsletterEmail && this.validateEmail(this.newsletterEmail)) {
      // Handle newsletter subscription
      console.log('Newsletter subscription for:', this.newsletterEmail);
      // Show success message or handle subscription logic
      this.newsletterEmail = '';
    }
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.showScrollTop = window.scrollY > 400;
  }
}