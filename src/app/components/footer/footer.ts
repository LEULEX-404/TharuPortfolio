import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type SocialIcon = 'github' | 'linkedin' | 'facebook' | 'whatsapp' | 'email';

interface SocialLink {
  name: string;
  url: string;
  icon: SocialIcon;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class Footer {
  currentYear = new Date().getFullYear();

  email = 'miyurut20@gmail.com';
  phone = '076 215 7137';
  phoneHref = '+94762157137';
  location = 'Kaduwela, Sri Lanka';

  socialLinks: SocialLink[] = [
    { name: 'GitHub', url: 'https://github.com/LEULEX-404', icon: 'github' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/miyuru-tharuka-18a9b6412', icon: 'linkedin' },
    { name: 'Facebook', url: 'https://web.facebook.com/TharukaFB', icon: 'facebook' },
    { name: 'WhatsApp', url: 'https://wa.me/94762157137', icon: 'whatsapp' },
    { name: 'Email', url: 'mailto:miyurut20@gmail.com', icon: 'email' }
  ];

  downloadCV() {
    const link = document.createElement('a');
    link.href = 'CV/Tharuka(CV).pdf';
    link.download = 'Tharuka-CV.pdf';
    link.click();
  }
}
