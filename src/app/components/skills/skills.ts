import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  name: string;
  level: number;
  category: string;
  icon: string;
  color: string;
  experience: string;
  badgeUrl?: string;
}

interface Certification {
  title: string;
  issuer: string;
  date: string;
  image: string;
  credentialUrl: string;
}

interface DashboardStat {
  value: string;
  label: string;
  icon: string;
}

interface Category {
  id: string;
  name: string;
  count: number;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrls: ['./skills.css']
})
export class Skills implements OnInit, AfterViewInit {
  selectedCategory = 'all';
  filteredSkills: Skill[] = [];
  private revealObserver?: IntersectionObserver;

  private readonly badgeSpecs: Record<string, { icon: string; colorOverride?: string; customUrl?: string }> = {
    angular: { icon: 'angular' },
    react: { icon: 'react' },
    typescript: { icon: 'typescript' },
    javascript: { icon: 'javascript' },
    html: { icon: 'html5' },
    tailwind: { icon: 'tailwindcss' },
    nodejs: { icon: 'nodedotjs' },
    express: { icon: 'express', colorOverride: 'FFFFFF' },
    api: { icon: 'swagger' },
    mongodb: { icon: 'mongodb' },
    mysql: { icon: 'mysql' },
    git: { icon: 'git' },
    aws: {
      icon: 'amazonaws',
      customUrl: 'https://api.iconify.design/logos/aws.svg'
    },
    docker: { icon: 'docker' },
    kubernetes: { icon: 'kubernetes' }
  };

  dashboardStats: DashboardStat[] = [
    { value: '2+', label: 'Years Experience', icon: 'clock' },
    { value: '5+', label: 'Projects Completed', icon: 'briefcase' },
    { value: '8+', label: 'Technologies Mastered', icon: 'layers' },
    { value: '4', label: 'Certifications', icon: 'award' }
  ];

  categories: Category[] = [
    { id: 'all', name: 'All Skills', count: 0 },
    { id: 'frontend', name: 'Frontend', count: 0 },
    { id: 'backend', name: 'Backend', count: 0 },
    { id: 'database', name: 'Database', count: 0 },
    { id: 'devops', name: 'DevOps & Tools', count: 0 }
  ];

  skills: Skill[] = [
    // Frontend
    { name: 'Angular', level: 95, category: 'frontend', icon: 'angular', color: '#DD0031', experience: '1 year' },
    { name: 'React', level: 90, category: 'frontend', icon: 'react', color: '#61DAFB', experience: '1 year' },
    { name: 'TypeScript', level: 92, category: 'frontend', icon: 'typescript', color: '#3178C6', experience: '1 year' },
    { name: 'JavaScript', level: 94, category: 'frontend', icon: 'javascript', color: '#F7DF1E', experience: '2 years' },
    { name: 'HTML5/CSS3', level: 96, category: 'frontend', icon: 'html', color: '#E34F26', experience: '3 years' },
    { name: 'Tailwind CSS', level: 88, category: 'frontend', icon: 'tailwind', color: '#06B6D4', experience: '1 year' },
    
    // Backend
    { name: 'Node.js', level: 89, category: 'backend', icon: 'nodejs', color: '#339933', experience: '1 year' },
    { name: 'Express.js', level: 87, category: 'backend', icon: 'express', color: '#000000', experience: '1 year' },
    { name: 'REST APIs', level: 93, category: 'backend', icon: 'api', color: '#00D4FF', experience: '1 year' },
    
    // Database
    { name: 'MongoDB', level: 85, category: 'database', icon: 'mongodb', color: '#47A248', experience: '1 year' },
    { name: 'MySQL', level: 80, category: 'database', icon: 'mysql', color: '#4479A1', experience: '2 years' },
    
    // DevOps
    { name: 'Git', level: 93, category: 'devops', icon: 'git', color: '#F05032', experience: '1 year' },
    { name: 'AWS', level: 78, category: 'devops', icon: 'aws', color: '#FF9900', experience: '1 year' },
    { name: 'Docker', level: 88, category: 'devops', icon: 'docker', color: '#2496ED', experience: '1 year' },
    { name: 'Kubernetes', level: 84, category: 'devops', icon: 'kubernetes', color: '#326CE5', experience: '1 year' }

  ];

  certifications: Certification[] = [
    {
      title: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: 'December 2023',
      image: 'aws-cert',
      credentialUrl: '#'
    },
    {
      title: 'Google Cloud Professional',
      issuer: 'Google Cloud',
      date: 'October 2023',
      image: 'gcp-cert',
      credentialUrl: '#'
    },
    {
      title: 'MongoDB Certified Developer',
      issuer: 'MongoDB University',
      date: 'June 2022',
      image: 'mongodb-cert',
      credentialUrl: '#'
    },
    {
      title: 'Docker Certified Associate',
      issuer: 'Docker Inc',
      date: 'March 2023',
      image: 'docker-cert',
      credentialUrl: '#'
    }
  ];

  expertiseTags: string[] = [
    'Agile/Scrum',
    'RESTful API Design',
    'Progressive Web Apps',
    'Responsive Design',
    'Performance Optimization',
    'Security Best Practices',
    'Cloud Architecture',
    'DevOps Practices',
    'UI/UX Principles',
    'Code Review',
    'Team Leadership',
    'Technical Documentation',
    'Continuous Integration',
    'Database Design'
  ];

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.skills = this.skills.map(skill => ({
      ...skill,
      badgeUrl: this.buildBadgeUrl(skill)
    }));
    this.updateCategoryCounts();
    this.updateFilteredSkills();
  }

  ngAfterViewInit() {
    // Check if we're in browser environment
    if (typeof window !== 'undefined') {
      this.animateNumbers();
      this.initScrollAnimations();
    }
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

  selectCategory(categoryId: string) {
    this.selectedCategory = categoryId;
    this.updateFilteredSkills();

    if (typeof window !== 'undefined') {
      setTimeout(() => this.refreshSkillReveal(), 0);
    }
  }

  trackBySkill(_index: number, skill: Skill): string {
    return skill.name;
  }

  getLevelLabel(level: number): string {
    if (level >= 90) return 'Expert';
    if (level >= 80) return 'Advanced';
    if (level >= 70) return 'Intermediate';
    return 'Beginner';
  }

  // 3D Tilt Effect for Skill Cards
  onSkillHover(event: MouseEvent) {
    const card = event.currentTarget as HTMLElement;
    card.style.transform = 'scale(1.02)';
  }

  onSkillMove(event: MouseEvent) {
    const card = event.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  }

  onSkillLeave(event: MouseEvent) {
    const card = event.currentTarget as HTMLElement;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
  }

  // Animate dashboard numbers
  private animateNumbers() {
    const statValues = this.elementRef.nativeElement.querySelectorAll('.stat-value');
    
    statValues.forEach((stat: HTMLElement, index: number) => {
      const target = this.dashboardStats[index].value;
      const numericValue = parseInt(target.replace(/\D/g, '')) || 0;
      const suffix = target.replace(/[0-9]/g, '');
      
      let current = 0;
      const increment = numericValue / 50;
      const duration = 2000;
      const stepTime = duration / 50;

      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          stat.textContent = numericValue + suffix;
          clearInterval(timer);
        } else {
          stat.textContent = Math.floor(current) + suffix;
        }
      }, stepTime);
    });
  }

  // Scroll-triggered animations
  private initScrollAnimations() {
    // Check if IntersectionObserver is available (browser environment)
    if (typeof IntersectionObserver === 'undefined') {
      // Fallback: just add animate-in class immediately
      const elements = this.elementRef.nativeElement.querySelectorAll(
        '.page-header, .dashboard-stats, .category-filter-section, .certifications-section, .skill-card, .cert-card, .expertise-tag'
      );
      elements.forEach((el: Element) => el.classList.add('animate-in'));
      return;
    }

    this.revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            this.revealObserver?.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    this.observeRevealTargets();
  }

  private observeRevealTargets() {
    if (!this.revealObserver) {
      return;
    }

    const root = this.elementRef.nativeElement as HTMLElement;

    const sectionWrappers = root.querySelectorAll(
      '.page-header, .dashboard-stats, .category-filter-section, .certifications-section'
    );
    sectionWrappers.forEach((section: Element, index: number) => {
      (section as HTMLElement).style.setProperty('--reveal-delay', `${index * 0.12}s`);
      this.revealObserver?.observe(section);
    });

    root.querySelectorAll('.skill-card, .cert-card, .expertise-tag').forEach((element: Element) => {
      this.revealObserver?.observe(element);
    });
  }

  private updateFilteredSkills() {
    this.filteredSkills = this.selectedCategory === 'all'
      ? [...this.skills]
      : this.skills.filter(skill => skill.category === this.selectedCategory);
  }

  private refreshSkillReveal() {
    const root = this.elementRef.nativeElement as HTMLElement;
    const cards = root.querySelectorAll('.skill-card');

    if (typeof IntersectionObserver === 'undefined' || !this.revealObserver) {
      cards.forEach((card: Element) => card.classList.add('animate-in'));
      return;
    }

    cards.forEach((card: Element, index: number) => {
      const element = card as HTMLElement;
      element.classList.remove('animate-in');
      element.style.setProperty('--reveal-delay', `${index * 0.05}s`);
      this.revealObserver?.observe(element);
    });
  }

  private buildBadgeUrl(skill: Skill): string {
    const spec = this.badgeSpecs[skill.icon];
    if (spec?.customUrl) {
      return spec.customUrl;
    }
    const icon = spec?.icon ?? 'simpleicons';
    const iconColor = (spec?.colorOverride ?? skill.color).replace('#', '').toLowerCase();

    return `https://cdn.simpleicons.org/${encodeURIComponent(icon)}/${encodeURIComponent(iconColor)}`;
  }

  downloadResume() {
    // Implement resume download logic
    console.log('Downloading resume...');
    
    // Example implementation:
    const link = document.createElement('a');
    link.href = 'CV/Tharuka(CV).pdf';
    link.download = 'Tharuka-CV.pdf';
    link.click();
  }
}