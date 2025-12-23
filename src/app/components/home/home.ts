import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit, OnDestroy {
  typedText = '';
  roles = [
    'Full Stack Developer',
    'UI/UX Designer', 
    'Problem Solver',
    'Tech Innovator'
  ];
  currentRoleIndex = 0;
  currentRole = '';
  isDeleting = false;
  private typeInterval: any;
  particleArray = Array(20).fill(0);

  stats = [
    { value: '5+', label: 'Projects', icon: 'briefcase' },
    { value: '1+', label: 'Years', icon: 'clock' },
    { value: '10+', label: 'Clients', icon: 'users' },
    { value: '100%', label: 'Satisfaction', icon: 'heart' }
  ];

  technologies = [
    { name: 'Angular', color: '#dd0031' },
    { name: 'React', color: '#61dafb' },
    { name: 'Node.js', color: '#339933' },
    { name: 'Java', color: '#3178c6' },
    { name: 'MongoDB', color: '#47a248' },
    { name: 'AWS', color: '#ff9900' }
  ];

  ngOnInit() {
    this.startTyping();
  }

  ngOnDestroy() {
    if (this.typeInterval) {
      clearTimeout(this.typeInterval);
    }
  }

  startTyping() {
    const type = () => {
      const fullRole = this.roles[this.currentRoleIndex];
      
      if (this.isDeleting) {
        this.currentRole = fullRole.substring(0, this.currentRole.length - 1);
      } else {
        this.currentRole = fullRole.substring(0, this.currentRole.length + 1);
      }

      let speed = this.isDeleting ? 50 : 100;

      if (!this.isDeleting && this.currentRole === fullRole) {
        speed = 2000;
        this.isDeleting = true;
      } else if (this.isDeleting && this.currentRole === '') {
        this.isDeleting = false;
        this.currentRoleIndex = (this.currentRoleIndex + 1) % this.roles.length;
        speed = 500;
      }

      this.typeInterval = setTimeout(() => type(), speed);
    };

    type();
  }

  downloadCV() {
    // Implement CV download logic here
    // Example: window.open('assets/cv/your-cv.pdf', '_blank');
    console.log('Downloading CV...');
    
    // You can create a link element and trigger download
    const link = document.createElement('a');
    link.href = 'assets/cv/tharuka-cv.pdf'; // Update with your CV path
    link.download = 'Tharuka-Miyuru-CV.pdf';
    link.click();
  }

  scrollToContact() {
    // Scroll to footer contact section
    window.scrollTo({ 
      top: document.body.scrollHeight, 
      behavior: 'smooth' 
    });
  }
}