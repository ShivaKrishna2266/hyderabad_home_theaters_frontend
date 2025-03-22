import { Component, OnInit } from '@angular/core';
import { UserStorageService } from '../services/storege/user-storege.service';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    private userStorageService:UserStorageService,
     private router: Router) {}

  ngOnInit(): void {
     
  }

  goToHome(){
    this.userStorageService.singOut();
    this.router.navigate(['/home']);
  }
  logout() {
    this.userStorageService.singOut();
    this.router.navigate(['/login']);
  }
}
