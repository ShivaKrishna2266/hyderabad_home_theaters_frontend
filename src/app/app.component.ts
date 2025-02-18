import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })), // Initial state
      transition(':enter', [animate('500ms ease-in')]), // Fade-in effect
      transition(':leave', [animate('500ms ease-out')]) // Fade-out effect
    ])
  ]
})
export class AppComponent {
  title = 'hyderabad_home_theaters_frontEnd';
}
