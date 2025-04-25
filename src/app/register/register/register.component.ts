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
  appUserRoles: string[] = ['ROLE_ADMIN','ROLE_USER']; // You can replace with API-based dynamic roles
  userDataForOtp: any;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      role: ['USER', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });

    this.otpForm = this.fb.group({
      otp: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signupForm.valid && this.signupForm.value.password === this.signupForm.value.confirmPassword) {
      this.userDataForOtp = this.signupForm.value;
      this.authService.register(this.signupForm.value).subscribe({
        next: (res) => {
          this.otpSent = true;
          alert("OTP sent to your mobile number.");
        },
        error: (err) => {
          alert("Failed to send OTP.");
          console.error(err);
        }
      });
    } else {
      alert("Please fill all fields correctly.");
    }
  }

  onOtpSubmit() {
    const otpPayload = {
      ...this.userDataForOtp,
      otp: this.otpForm.value.otp
    };

    this.authService.verifyOtp(otpPayload).subscribe({
      next: (res) => {
        alert('Register Successfully!');
        // Navigate based on role
        const role = this.userDataForOtp.role;
        if (role === 'ROLE_ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user']);
        }
      },
      error: (err) => {
        alert('Invalid OTP');
        console.error(err);
      }
    });
  }
}