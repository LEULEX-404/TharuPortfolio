import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
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

 

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.initMouseTracking();
    // Start typing immediately when component loads
    this.typeWriter();
  }

  ngOnDestroy() {
    if (this.typeInterval) {
      clearInterval(this.typeInterval);
    }
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
    link.href = 'assets/cv/tharuka-cv.pdf';
    link.download = 'Tharuka-Miyuru-CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  scrollToContact() {
    window.scrollTo({ 
      top: document.body.scrollHeight, 
      behavior: 'smooth' 
    });
  }

  navigateToProjects() {
    // Router navigation will be handled by routerLink
  }

  navigateToAbout() {
    // Router navigation will be handled by routerLink
  }

  navigateToSkills() {
    // Router navigation will be handled by routerLink
  }
}