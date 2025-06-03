import { Component, HostListener, OnInit } from '@angular/core';

declare var Tawk_API: any;
@Component({
  selector: 'app-whatsapp-widget',
  templateUrl: './whatsapp-widget.component.html',
  styleUrls: ['./whatsapp-widget.component.scss']
})

export class WhatsappWidgetComponent implements OnInit {

  isVisible: boolean = false;
  isChatBoxEnable: boolean = true;
  logoSrc: string = 'your-logo.png'; 
  buttonMessage: string = '';  // <-- to hold return text

 faqList = [
  { 
    question: 'What services do you offer?', 
    answer: 'We offer premium home theater installations, including design, setup, and calibration.',
    showAnswer: false
  },
  { 
    question: 'How can I contact support?', 
    answer: 'You can use the live chat, WhatsApp widget, or email us at support@hyderabadhometheaters.com.',
    showAnswer: false
  },
  { 
    question: 'What are your working hours?', 
    answer: 'We are available from 9 AM to 9 PM, Monday to Saturday.',
    showAnswer: false
  }
];

  ngOnInit(): void {
    this.loadTawkToScript();
  }

  loadTawkToScript(): void {
    var s1 = document.createElement('script');
    s1.async = true;
    s1.src = 'https://embed.tawk.to/68385ebe572be3190b6e56ce/1ise346or';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    var s0 = document.getElementsByTagName('script')[0];
    s0.parentNode?.insertBefore(s1, s0);
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  closePopup(): void {
    this.isChatBoxEnable = false;
  }

  handleError(): void {
    this.logoSrc = 'fallback-image.png';
  }

  messageUs(): void {
    if (typeof Tawk_API !== 'undefined') {
      Tawk_API.maximize();
      this.buttonMessage = 'Chat opened!';
    } else {
      this.buttonMessage = 'Chat API not ready!';
    }
  }


  toggleAnswer(index: number): void {
  this.faqList[index].showAnswer = !this.faqList[index].showAnswer;
}
}