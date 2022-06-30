import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import {
  resendEmailApiResponse,
  resendEmailFormType,
} from 'src/app/shared/Types';
import { actionModeSelector } from 'src/app/state/selectors';

@Component({
  selector: 'app-resend-email',
  templateUrl: './resend-email.component.html',
})
export class ResendEmailComponent implements OnInit {
  actionMode$!: Observable<string>;
  actionModeValue: string = '';
  resendEmail!: resendEmailFormType;
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private http: HttpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.actionMode();
    this.resendEmail = this.fb.group({
      email: ['', Validators.required],
    }) as resendEmailFormType;
  }

  actionMode() {
    this.actionMode$ = this.store.pipe(select(actionModeSelector));
    this.actionMode$.subscribe((value) => {
      this.actionModeValue = value;
    });
  }

  // submit form data
  onSubmit() {
    this.errorMessage = '';
    this.loading = true;
    let lastUrl = '';

    if (this.actionModeValue === 'forget-password') {
      lastUrl = '/forgot-password/';
    } else {
      lastUrl = '/resend-email/';
    }

    this.http.resendEmail(lastUrl, this.resendEmail.value).subscribe(
      (value: resendEmailApiResponse) => {
        this.loading = false;
        if (
          value.response === 'Email does not exist.' ||
          value.response === 'User already verified.'
        ) {
          this.errorMessage = value.response;
        } else {
          if (this.actionModeValue === 'forget-password') {
            this.router.navigateByUrl('new-password');
          } else {
            this.router.navigateByUrl('verify-email');
          }
        }
      },
      (error) => {
        this.loading = false;
        this.errorMessage = error;
      }
    );
  }
}
