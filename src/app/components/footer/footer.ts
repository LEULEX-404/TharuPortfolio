import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VERSION } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  portfolioTitle = 'THARUKA';
  tagline = 'Full Stack Developer | Creative Problem Solver | Tech Enthusiast';
  
  currentYear = new Date().getFullYear();
  angularVersion = VERSION.major;

  socialLinks = {
    github: 'https://github.com/LEULEX-404',
    linkedin: 'https://linkedin.com/in/yourusername',
    facebook: 'https://facebook.com/Miyuru Tharuka',
    email: 'miyurut20@gmail.com'
  };

  contactInfo = {
    email: 'miyurut20@gmail.com',
    location: 'Kothalawala, Kaduwela'
  };
}
