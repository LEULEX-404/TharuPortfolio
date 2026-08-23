import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  name: string;
  level: number;
  category: string;
  logo: string;
}

interface Certification {
  title: string;
  issuer: string;
  date: string;
}

interface SkillColumn {
  id: string;
  name: string;
  skills: Skill[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrls: ['./skills.css']
})
export class Skills implements OnInit {
  private readonly columnOrder: { id: string; name: string }[] = [
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'database', name: 'Database' },
    { id: 'devops', name: 'DevOps & tools' }
  ];

  skills: Skill[] = [
    { name: 'HTML5 / CSS3', level: 96, category: 'frontend', logo: 'html5/html5-original' },
    { name: 'Angular', level: 95, category: 'frontend', logo: 'angularjs/angularjs-original' },
    { name: 'JavaScript', level: 94, category: 'frontend', logo: 'javascript/javascript-original' },
    { name: 'TypeScript', level: 92, category: 'frontend', logo: 'typescript/typescript-original' },
    { name: 'React', level: 90, category: 'frontend', logo: 'react/react-original' },
    { name: 'Tailwind CSS', level: 88, category: 'frontend', logo: 'tailwindcss/tailwindcss-original' },

    { name: 'REST APIs', level: 93, category: 'backend', logo: '' },
    { name: 'Node.js', level: 89, category: 'backend', logo: 'nodejs/nodejs-original' },
    { name: 'Express.js', level: 87, category: 'backend', logo: 'express/express-original' },

    { name: 'MongoDB', level: 85, category: 'database', logo: 'mongodb/mongodb-original' },
    { name: 'MySQL', level: 80, category: 'database', logo: 'mysql/mysql-original' },

    { name: 'Git', level: 93, category: 'devops', logo: 'git/git-original' },
    { name: 'Docker', level: 88, category: 'devops', logo: 'docker/docker-original' },
    { name: 'Kubernetes', level: 84, category: 'devops', logo: 'kubernetes/kubernetes-plain' },
    { name: 'AWS', level: 78, category: 'devops', logo: 'amazonwebservices/amazonwebservices-original-wordmark' }
  ];

  certifications: Certification[] = [
    { title: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', date: 'Dec 2023' },
    { title: 'Google Cloud Professional', issuer: 'Google Cloud', date: 'Oct 2023' },
    { title: 'MongoDB Certified Developer', issuer: 'MongoDB University', date: 'Jun 2022' },
    { title: 'Docker Certified Associate', issuer: 'Docker Inc', date: 'Mar 2023' }
  ];

  skillColumns: SkillColumn[] = [];

  private readonly logoBase = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/';

  logoUrl(logo: string): string {
    return logo ? `${this.logoBase}${logo}.svg` : '';
  }

  ngOnInit() {
    this.skillColumns = this.columnOrder.map(col => ({
      ...col,
      skills: this.skills.filter(skill => skill.category === col.id)
    }));
  }

  downloadResume() {
    const link = document.createElement('a');
    link.href = 'CV/Tharuka(CV).pdf';
    link.download = 'Tharuka-CV.pdf';
    link.click();
  }
}
