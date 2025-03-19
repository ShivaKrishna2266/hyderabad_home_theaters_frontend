import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-whatsapp-widget',
  templateUrl: './whatsapp-widget.component.html',
  styleUrls: ['./whatsapp-widget.component.scss']
})
export class WhatsappWidgetComponent implements OnInit {

  public isChatBoxEnable: boolean = false;

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

  // closePopup() {
  //   console.log('Closing chatbox...');
  //   this.isChatBoxEnable = false;
  //   console.log('Chatbox closed:', this.isChatBoxEnable);
  // }

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
