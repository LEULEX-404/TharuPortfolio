import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
  type: 'work' | 'education' | 'award';
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrls: ['./about.css']
})
export class About {
  timeline: TimelineItem[] = [
    {
      year: '2025',
      title: "Dean's List Award",
      company: 'Sri Lanka Institute of Information Technology',
      description: 'Recognized for academic excellence in Software Engineering — top 10% of class, 3.7/4.0 GPA.',
      type: 'award'
    },
    {
      year: '2024',
      title: "Dean's List Award",
      company: 'Sri Lanka Institute of Information Technology',
      description: 'Recognized for academic excellence in Software Engineering — top 10% of class, 3.8/4.0 GPA.',
      type: 'award'
    },
    {
      year: '2023',
      title: "Dean's List Award",
      company: 'Sri Lanka Institute of Information Technology',
      description: 'Recognized for academic excellence in Software Engineering — top 10% of class, 3.7/4.0 GPA.',
      type: 'award'
    },
    {
      year: '2023',
      title: 'Diploma in Information Technology',
      company: 'ESOFT Metro Campus',
      description: 'Completed with distinction, building the software-development foundation for everything since.',
      type: 'education'
    },
    {
      year: '2022',
      title: 'Insurance Consultant',
      company: 'Arpico Insurance PLC',
      description: "Advised clients on tailored insurance policies — closed the region's highest sales in Q4 2022.",
      type: 'work'
    }
  ];
}
