import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
  achievements: string[];
  type: 'work' | 'education' | 'award';
}

interface Stat {
  value: string;
  label: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrls: ['./about.css']
})
export class About {
  stats: Stat[] = [
    {
      value: '5+',
      label: 'Projects Completed',
      description: 'Successfully delivered',
      icon: 'check-circle'
    },
    {
      value: '1+',
      label: 'Years Experience',
      description: 'In web development',
      icon: 'calendar'
    },
    {
      value: '10+',
      label: 'Happy Clients',
      description: 'Worldwide',
      icon: 'smile'
    },
    {
      value: '5+',
      label: 'Technologies',
      description: 'Mastered',
      icon: 'layers'
    }
  ];

  timeline: TimelineItem[] = [
    {
      year: '2022',
      title: 'Insuarance Consultant',
      company: 'Arpico Insurance PLC',
      description: 'Worked as an Insurance Consultant, providing tailored insurance solutions to clients.',
      achievements: [
        'Advised clients on insurance policies',
        'Achieved highest sales in the region for Q4 2022'
      ],
      type: 'work'
    },
    {
      year: '2023',
      title: 'Diploma in Information Technology',
      company: 'ESOFT Metro Campus',
      description: 'Diploma certification in Information Technology',
      achievements: [
        'Passed with distinction',
        'Enhanced knowledge in software development',
      ],
      type: 'education'
    },
    {
      year: '2023',
      title: 'Dean\'s List Award',
      company: 'Sri Lanka Institute of Information Technology',
      description: 'Recognized for academic excellence in Software Engineering',
      achievements: [
        'Top 10% of the class',
        'Maintained a GPA of 3.7/4.0'
      ],
      type: 'award'
    },
    {
      year: '2024',
      title: 'Dean\'s List Award',
      company: 'Sri Lanka Institute of Information Technology',
      description: 'Recognized for academic excellence in Software Engineering',
      achievements: [
        'Top 10% of the class',
        'Maintained a GPA of 3.8/4.0'
      ],
      type: 'award'
    }
  ];

  interests = [
    { name: 'UI/UX Design', icon: 'palette' },
    { name: 'Gaming', icon: 'gaming' },
    { name: 'Music', icon: 'music' },
    { name: 'Mentoring', icon: 'users' },
    { name: 'Photography', icon: 'camera' },
    { name: 'Traveling', icon: 'map' }
  ];
}