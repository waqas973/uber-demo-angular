import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { HttpService } from 'src/app/services/http.service';
import { loginApiResponseType, loginFormType } from 'src/app/shared/Types';
import { actionMode, loginAction } from 'src/app/state/actions/actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm!: loginFormType;
  errorMessage: string = '';
  loading: boolean = false;

  // constructor
  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private store: Store,
    private router: Router
  ) {}

  /**
   *
   * getter functions
   *
   */
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  // ng on init
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    }) as loginFormType;
  }

  // submit form data
  onSubmit() {
    this.errorMessage = '';
    this.loading = true;
    const { email, password } = this.loginForm.value;
    const submittingData = { email, password };
    this.http.login(submittingData).subscribe(
      (data: loginApiResponseType) => {
        this.loading = false;
        localStorage.setItem('uber-clone-angular-token', data.access!);
        this.store.dispatch(loginAction({ payload: data }));
        this.router.navigateByUrl('dashboard');
      },
      (error) => {
        this.loading = false;
        this.errorMessage = error;
      }
    );
  }

  // set navigate url for forget-password and verify-email
  handleNagivate(mode: string) {
    localStorage.setItem('uber-angular-demo-mode', mode);
    this.store.dispatch(actionMode({ payload: mode }));
    this.router.navigateByUrl(mode);
  }
}
