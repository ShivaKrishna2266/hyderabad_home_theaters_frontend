import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AppUserRole } from 'src/app/services/auth/user.dto';
import { UserStorageService } from 'src/app/services/storege/user-storege.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  signupForm!: FormGroup;
  otpForm!: FormGroup;
  otpSent = false;
  phoneNumber: string = '';
  appUserRoles = ['Admin', 'User'];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userStorageService: UserStorageService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required]
    });

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern('^[0-9]{4,6}$')]]
    });
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      alert('Please fill all fields correctly');
      return;
    }

    const { password, confirmPassword } = this.signupForm.value;
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const userData = this.signupForm.value;

    UserStorageService.setPendingUser(userData); // ✅ Corrected to use instance

    this.authService.register(userData.phoneNumber).subscribe({
      next: () => {
        this.otpSent = true;
        this.phoneNumber = userData.phoneNumber;
      },
      error: (err) => {
        alert('Failed to send OTP: ' + (err.error?.message || 'Unknown error'));
        console.error(err);
      }
    });
  }

  onOtpSubmit(): void {
    if (this.otpForm.invalid) {
      alert('Please enter a valid OTP.');
      return;
    }

    const otp = this.otpForm.value.otp;
    const userData = UserStorageService.getPendingUser(); // ✅ Corrected to use instance

    this.authService.verifyOtp({ ...userData, otp }).subscribe({
      next: () => {
        alert('Registration successful');
        UserStorageService.clearPendingUser(); // ✅ Corrected to use instance
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        alert('OTP verification failed: ' + (err.error?.message || 'Unknown error'));
        console.error(err);
      }
    });
  }
}
