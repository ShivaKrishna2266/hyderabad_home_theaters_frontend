import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
forgotPasswordForm!: FormGroup;
  message: string = '';
  error: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.forgotPasswordForm = this.fb.group({
      username: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.invalid) return;

    const username = this.forgotPasswordForm.value.username;
    this.authService.requestPasswordReset(username).subscribe(
      () => {
        this.message = 'Password reset link sent (if the user exists).';
        this.error = '';
      },
      () => {
        this.error = 'Failed to send reset link.';
        this.message = '';
      }
    );
  }
}
