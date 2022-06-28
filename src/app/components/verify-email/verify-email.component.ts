import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
})
export class VerifyEmailComponent implements OnInit {
  verifyEmailForm!: FormGroup<{ code: FormControl<string | null> }>;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private _toastr: ToastrService,
    private _router: Router
  ) {}

  /**
   *
   *  getter functions
   *
   */
  get emailCode() {
    return this.verifyEmailForm?.get('code');
  }

  ngOnInit(): void {
    this.verifyEmailForm = this.fb.group({
      code: ['', Validators.required],
    });
  }

  // submit data
  onSubmit() {
    this.loading = true;
    this.http.verifyEmail(this.verifyEmailForm.value).subscribe(
      () => {
        this.loading = false;
        this._toastr.success('Email verified successfully');
        setTimeout(() => {
          this._router.navigate(['/']);
        }, 3000);
      },
      (error) => {
        this.loading = false;
        this._toastr.error(error);
      }
    );
  }
}
