import { Component, OnInit } from '@angular/core';
import {
  faBars,
  faXmark,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loginStateType } from 'src/app/state/reducer/loginReducer';
import { loginSelector } from 'src/app/state/selectors';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  faBars: IconDefinition = faBars;
  faXmark: IconDefinition = faXmark;
  show: boolean = false;
  auth$!: Observable<loginStateType>;
  profile_pic?: string;
  loginUserdata!: loginStateType;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.auth$ = this.store.pipe(select(loginSelector));
    this.auth$.subscribe((value) => {
      this.loginUserdata = value;
      this.profile_pic = value?.userData?.user_detail?.partner_photo;
    });
  }

  handleMenu() {
    this.show = !this.show;
  }
}
