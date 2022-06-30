import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from './services/http.service';
import { actionMode, loginAction } from './state/actions/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(
    private http: HttpService,
    private toastr: ToastrService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.currentUserFunc();
    this.persistMode();
  }

  // persist current user data
  currentUserFunc() {
    if (localStorage.getItem('uber-clone-angular-token')) {
      this.http.currentLoginUser().subscribe(
        (data) => {
          this.store.dispatch(loginAction({ payload: data }));
        },
        (error) => {
          this.toastr.error(error);
        }
      );
    }
  }
  // persist action mode
  persistMode() {
    if (localStorage.getItem('uber-angular-demo-mode')) {
      this.store.dispatch(
        actionMode({ payload: localStorage.getItem('uber-angular-demo-mode')! })
      );
    }
  }
}
