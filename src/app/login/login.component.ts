import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { UserStorageService } from '../services/storege/user-storege.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  hidePassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userStorageService: UserStorageService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.userStorageService.singOut(); // Clears old session data on load

    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    const { username, password } = this.loginForm.value;
    this.authService.login(username, password).subscribe(
      (response) => {
        console.log(response.data);
        const res = response.body;
        if (res && res.token && res.role) {
          this.userStorageService.saveToken(res.token);
          this.userStorageService.saveUser(res);
          if (res.role === 'ROLE_ADMIN') {
            this.router.navigateByUrl('/admin/admin-dashbord');
          } else if (res.role === 'ROLE_USER') {
            this.router.navigateByUrl('/user/dashboard');
          } else {
            this.router.navigateByUrl('/dashboard');
          }
        }
      },
      (error) => { }
    );
  }
}
