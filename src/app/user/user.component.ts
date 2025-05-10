import { Component, OnInit } from '@angular/core';
import { UserStorageService } from '../services/storege/user-storege.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(
    private userStorageService: UserStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    
  }

  logOut() {
    this.userStorageService.singOut();
    this.router.navigateByUrl('/login');
  }
  

}
