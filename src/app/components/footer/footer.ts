import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class Footer implements OnInit {
  contactForm!: FormGroup;
  formStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  errorMessage = '';
  showScrollTop = false;
  currentYear = new Date().getFullYear();

  quickLinks = [
    { label: 'Home', path: '/home' },
    { label: 'About', path: '/about' },
    { label: 'Skills', path: '/skills' },
    { label: 'Projects', path: '/projects' }
  ];

  socialLinks = [
    { 
      name: 'GitHub', 
      url: 'https://github.com/LEULEX-404', 
      icon: 'github',
      color: '#333'
    },
    { 
      name: 'LinkedIn', 
      url: 'https://linkedin.com', 
      icon: 'linkedin',
      color: '#0077b5'
    },
    { 
      name: 'Facebook', 
      url: 'https://twitter.com', 
      icon: 'twitter',
      color: '#1da1f2'
    },
    { 
      name: 'Email', 
      url: 'mailto:miyurut20@gmail.com', 
      icon: 'mail',
      color: '#ea4335'
    }
  ];

  contactInfo = [
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
  }

  initializeForm() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]]
    });
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

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate random success/error for demo
      const success = Math.random() > 0.1; // 90% success rate
      
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

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.showScrollTop = window.scrollY > 300;
  }
}