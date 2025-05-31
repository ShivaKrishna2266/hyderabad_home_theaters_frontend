import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.scss']
})
export class AdminRegisterComponent implements OnInit {

  adminRegisterForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {}

  ngOnInit(): void {
    this.adminRegisterForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (!this.adminRegisterForm.valid) {
      alert('Please fill all fields correctly.');
      return;
    }

    if (this.adminRegisterForm.value.password !== this.adminRegisterForm.value.confirmPassword) {
      alert('Password and Confirm Password do not match.');
      return;
    }

    const adminData = {
      ...this.adminRegisterForm.value,
      role: 'ROLE_ADMIN' // Force role to admin
    };

    this.authService.register(adminData).subscribe({
      next: (res) => {
        alert('Admin account created successfully!');
        this.router.navigate(['/admin/admin-dashbord']); // Go back to admin dashboard
      },
      error: (err) => {
        alert('Failed to create admin: ' + (err.error?.error || 'Unknown error'));
        console.error(err);
      }
    });
  }
}
