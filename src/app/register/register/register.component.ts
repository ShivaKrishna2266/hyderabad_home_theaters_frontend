import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AppUserRole } from 'src/app/services/auth/user.dto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  appUserRoles: AppUserRole[] = Object.values(AppUserRole);
  signupForm: FormGroup = this.formBuilder.group({});
  hidePassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      role: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      alert('Please fill out all required fields.');
      return;
    }
  
    const { password, confirmPassword } = this.signupForm.value;
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
  
    this.authService.register(this.signupForm.value).subscribe(
      (response) => {
        alert(response.message || 'Registration successful');
        this.router.navigateByUrl('/login');
      },
      (error) => {
        alert('Registration failed: ' + (error.error?.message || 'Unknown error'));
        console.error('Error:', error);
      }
    );
  }
}

