import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserStorageService } from '../services/user-storege.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = { username: '', password: '' }; // User input model
  errorMessage: string | null = null; // Error handling
  public submitted = false;

  constructor(
    private router: Router,
    private userStorageService: UserStorageService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {}

  get f() {
    return this.user;
  }

  login(loginForm: NgForm) {
    this.submitted = true;
    
    if (loginForm.valid) {
      // Clear local storage before login
      this.userStorageService.clearStorage();

      const { username, password } = loginForm.value;
      this.authService.login(username, password).subscribe(
        (response: any) => {
          console.log('Login API Response:', response);
          
          // Store token and user details in local storage
          this.userStorageService.setToken(response.token);
          this.userStorageService.setRole(response.role);
          this.userStorageService.setUser(response.user); // Ensure `user` exists

          // Redirect based on role
          this.redirectBasedOnRole(response.role);
        },
        (error: any) => {
          console.error('Login API Error:', error);
          this.errorMessage = 'Invalid username or password.';
        }
      );
    }
  }

  private redirectBasedOnRole(role: string): void {
    switch (role) {
      case 'ADMIN':
        this.router.navigate(['/admin/admin_home']);
        break;
      case 'USER':
        this.router.navigate(['/user/home']);
        break;
      default:
        console.warn('Unknown role, redirecting to login.');
        this.router.navigate(['/login']); // Fallback redirection
        break;
    }
  }

  closeErrorMessage() {
    this.errorMessage = null;
  }
}
