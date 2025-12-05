import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,    // ✅ mark as standalone
  imports: [CommonModule], // ✅ import CommonModule here
  templateUrl: './about.html',
  styleUrls: ['./about.css'],
})
export class About implements AfterViewInit {
  // Skills
  skills = [
    { name: 'Angular', level: 90, tags: ['Frontend', 'SPA', 'TypeScript'] },
    { name: 'Node.js', level: 80, tags: ['Backend', 'API', 'Express'] },
    { name: 'CSS & HTML', level: 95, tags: ['Frontend', 'UI', 'Responsive'] },
  ];

  @ViewChildren('skillBar') skillBars!: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    // Animate each skill bar
    this.skillBars.forEach((bar, index) => {
      const skillLevel = this.skills[index].level;
      setTimeout(() => {
        bar.nativeElement.style.width = skillLevel + '%';
      }, 200 * index); // stagger animation for effect
    });
  }

  // Experience
  experiences = [
    {
      period: '2022 - Present',
      title: 'Full-Stack Developer',
      company: 'Tech Corp',
      description: 'Developing scalable web applications and APIs.',
      technologies: ['Angular', 'Node.js', 'MongoDB']
    },
    {
      period: '2020 - 2022',
      title: 'Frontend Developer',
      company: 'Web Solutions',
      description: 'Built interactive UI components and responsive designs.',
      technologies: ['HTML', 'CSS', 'JavaScript']
    }
  ];

  // Education
  education = [
    {
      degree: 'B.Sc. in Computer Science',
      institution: 'University of Tech',
      period: '2016 - 2020',
      details: 'Focused on software development and web technologies.'
    }
  ];

  // Achievements
  achievements = [
    { icon: '🏆', title: 'Best Developer Award', description: 'Recognized for outstanding performance.' },
    { icon: '🌟', title: 'Hackathon Winner', description: 'Won 1st place in local hackathon.' }
  ];

}
