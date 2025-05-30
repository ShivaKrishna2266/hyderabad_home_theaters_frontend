import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
 forgotPasswordForm!: FormGroup;
  resetPasswordForm!: FormGroup;
  token: string | null = null;

  message = '';
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token');

    if (this.token) {
      // Show reset password form
      this.resetPasswordForm = this.fb.group({
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]]
      }, { validator: this.passwordMatchValidator });
    } else {
      // Show forgot password form
      this.forgotPasswordForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]]
      });
    }
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('newPassword')!.value === form.get('confirmPassword')!.value
      ? null : { mismatch: true };
  }

  onForgotPasswordSubmit() {
    if (this.forgotPasswordForm.invalid) return;

    this.authService.requestPasswordReset(this.forgotPasswordForm.value.email).subscribe({
      next: () => {
        this.message = 'If this email exists, a reset link has been sent.';
        this.error = '';
      },
      error: () => {
        this.error = 'Failed to send reset link.';
        this.message = '';
      }
    });
  }

  onResetPasswordSubmit() {
    if (this.resetPasswordForm.invalid) return;

    const newPassword = this.resetPasswordForm.value.newPassword;

    this.authService.resetPassword(this.token!, newPassword).subscribe({
      next: () => {
        this.message = 'Password reset successful! Redirecting to login...';
        this.error = '';
        setTimeout(() => this.router.navigate(['/login']), 3000);
      },
      error: (err) => {
        this.error = err.error || 'Failed to reset password.';
        this.message = '';
      }
    });
  }
}