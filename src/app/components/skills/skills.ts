import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  name: string;
  level: number;
  category: string;
  icon: string;
  color: string;
  experience: string;
}

interface Certification {
  title: string;
  issuer: string;
  date: string;
  image: string;
  credentialUrl: string;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrls: ['./skills.css']
})
export class Skills implements OnInit {
  selectedCategory = 'all';
  animateSkills = false;

  categories = [
    { id: 'all', name: 'All Skills', count: 0 },
    { id: 'frontend', name: 'Frontend', count: 0 },
    { id: 'backend', name: 'Backend', count: 0 },
    { id: 'database', name: 'Database', count: 0 },
    { id: 'devops', name: 'DevOps & Tools', count: 0 }
  ];

  skills: Skill[] = [
    // Frontend
    { name: 'Angular', level: 95, category: 'frontend', icon: 'angular', color: '#DD0031', experience: '4 years' },
    { name: 'React', level: 90, category: 'frontend', icon: 'react', color: '#61DAFB', experience: '3 years' },
    { name: 'TypeScript', level: 92, category: 'frontend', icon: 'typescript', color: '#3178C6', experience: '4 years' },
    { name: 'JavaScript', level: 94, category: 'frontend', icon: 'javascript', color: '#F7DF1E', experience: '5 years' },
    { name: 'HTML5/CSS3', level: 96, category: 'frontend', icon: 'html', color: '#E34F26', experience: '5 years' },
    
    // Backend
    { name: 'Node.js', level: 89, category: 'backend', icon: 'nodejs', color: '#339933', experience: '4 years' },
    { name: 'Express', level: 87, category: 'backend', icon: 'express', color: '#000000', experience: '4 years' },
    { name: 'REST APIs', level: 93, category: 'backend', icon: 'api', color: '#00D4FF', experience: '4 years' },
    
    // Database
    { name: 'MongoDB', level: 85, category: 'database', icon: 'mongodb', color: '#47A248', experience: '3 years' },
    { name: 'MySQL', level: 80, category: 'database', icon: 'mysql', color: '#4479A1', experience: '3 years' },
    
    // DevOps
    { name: 'Git', level: 93, category: 'devops', icon: 'git', color: '#F05032', experience: '5 years' },
    { name: 'AWS', level: 78, category: 'devops', icon: 'aws', color: '#FF9900', experience: '2 years' }
  ];

  certifications: Certification[] = [
    {
      title: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023',
      image: 'aws-cert',
      credentialUrl: '#'
    },
    {
      title: 'Google Cloud Professional',
      issuer: 'Google Cloud',
      date: '2023',
      image: 'gcp-cert',
      credentialUrl: '#'
    },
    {
      title: 'MongoDB Certified Developer',
      issuer: 'MongoDB University',
      date: '2022',
      image: 'mongodb-cert',
      credentialUrl: '#'
    },
    {
      title: 'Docker Certified Associate',
      issuer: 'Docker Inc',
      date: '2023',
      image: 'docker-cert',
      credentialUrl: '#'
    }
  ];

  experienceYears = 1;
  totalProjects = 5;
  technologiesMastered = 8;

  ngOnInit() {
    this.updateCategoryCounts();
    setTimeout(() => {
      this.animateSkills = true;
    }, 100);
  }

  updateCategoryCounts() {
    this.categories.forEach(cat => {
      if (cat.id === 'all') {
        cat.count = this.skills.length;
      } else {
        cat.count = this.skills.filter(s => s.category === cat.id).length;
      }
    });
  }

  get filteredSkills(): Skill[] {
    if (this.selectedCategory === 'all') {
      return this.skills;
    }
    return this.skills.filter(skill => skill.category === this.selectedCategory);
  }

  selectCategory(categoryId: string) {
    this.selectedCategory = categoryId;
    this.animateSkills = false;
    setTimeout(() => {
      this.animateSkills = true;
    }, 50);
  }

  getSkillIcon(icon: string): string {
    // Return SVG paths or icon classes based on icon name
    return icon;
  }

  downloadResume() {
    // Implement resume download
    console.log('Downloading resume...');
  }
}