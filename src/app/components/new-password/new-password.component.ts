import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/services/http.service';
import { newPasswordFormType } from 'src/app/shared/Types';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
})
export class NewPasswordComponent implements OnInit {
  newPasswordForm!: newPasswordFormType;
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  // getter function

  get password() {
    return this.newPasswordForm.get('password');
  }
  get token() {
    return this.newPasswordForm.get('token');
  }

  ngOnInit(): void {
    this.newPasswordForm = this.fb.group({
      password: ['', Validators.required],
      token: ['', Validators.required],
    }) as newPasswordFormType;
  }

  // submit form data
  onSubmit() {
    if (!this.newPasswordForm.valid) {
      this.newPasswordForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.http.newPassword(this.newPasswordForm.value).subscribe(
      () => {
        this.loading = false;
        this.toastr.success('Password changed successfully');
        setTimeout(() => {
          this.toastr.clear();
          this.router.navigate(['login']);
        }, 2000);
      },
      (error) => {
        this.loading = false;
        this.errorMessage = error;
      }
    );
  }
}
