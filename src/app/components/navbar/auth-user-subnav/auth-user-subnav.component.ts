import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faChevronDown,
  IconDefinition,
  faComment,
} from '@fortawesome/free-solid-svg-icons';

import { Store } from '@ngrx/store';
import { logoutAction } from 'src/app/state/actions/actions';
import jsonData from '../../../shared/data.json';

interface authUserDropdownType {
  link: string;
  text: string;
  imageSrc: string;
}

@Component({
  selector: 'app-auth-user-subnav',
  templateUrl: './auth-user-subnav.component.html',
})
export class AuthUserSubnavComponent implements OnInit {
  faChevronDown: IconDefinition = faChevronDown;
  faComment: IconDefinition = faComment;
  authUserDropdown: authUserDropdownType[] = jsonData.authUserDropdown;

  @Input() profile_pic?: string;
  @Input() unreadCount!: number;

  constructor(private _router: Router, private store: Store) {}

  ngOnInit(): void {}

  logout() {
    localStorage.clear();
    this.store.dispatch(logoutAction());
    this._router.navigateByUrl('/');
  }

  goToChat() {
    this._router.navigateByUrl('/chat');
  }
}
