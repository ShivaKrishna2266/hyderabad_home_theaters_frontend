import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-whatsapp-widget',
  templateUrl: './whatsapp-widget.component.html',
  styleUrls: ['./whatsapp-widget.component.scss']
})
export class WhatsappWidgetComponent implements OnInit {

  public isChatBoxEnable: boolean = false;
  isVisible = false;

  constructor(){}

  ngOnInit(): void {
    
  }

  logoSrc = 'https://cdn.clare.ai/wati/images/WATI_logo_square_2.png';

  handleError() {
    this.logoSrc = 'https://cdn.clare.ai/wati/images/WATI_logo_square_2.png';
  }

  messageUs() {
    this.isChatBoxEnable = true;
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.isVisible = window.scrollY > 200; // Show button when scrolled 200px down
    console.log("Scroll Position:", window.scrollY, "isVisible:", this.isVisible); // Debugging
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  openPopup() {
    this.isChatBoxEnable = true;
    setTimeout(() => {
        document.querySelector('.wa-chat-box')?.classList.add('show');
    }, 50);
}

closePopup() {
    document.querySelector('.wa-chat-box')?.classList.remove('show');
    setTimeout(() => {
        this.isChatBoxEnable = false;
    }, 300);
}


}
