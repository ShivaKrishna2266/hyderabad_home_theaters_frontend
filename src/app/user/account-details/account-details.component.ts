import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileDTO } from 'src/app/DTO/profileDTO';
import { UserDTO } from 'src/app/DTO/userDTO';
import { UserStorageService } from 'src/app/services/storege/user-storege.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {
  userDetails: ProfileDTO | null = null;
  loading = true;
  errorMessage = '';

  constructor(
    private userStorageService: UserStorageService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = UserStorageService.getUser();
    const username = user?.username;

    if (username) {
      this.userService.getUserDetails(username).subscribe({
        next: (res) => {
          this.userDetails = res.data;
          this.loading = false;
        },
        error: () => {
          this.errorMessage = 'Failed to load user details';
          this.loading = false;
        }
      });
    } else {
      this.errorMessage = 'User not found in local storage';
      this.loading = false;
    }
  }

  logOut(): void {
    this.userStorageService.singOut();
    this.router.navigate(['/login']);
  }
}
