import { Component, OnInit } from '@angular/core';
import {
  faBars,
  faXmark,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TalkService } from 'src/app/services/talk.service';
import {
  ApiResponseDriversResultType,
  TalkUserInterface,
} from 'src/app/shared/Types';
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
  unreadCount: number = 0;

  constructor(private store: Store, private talkService: TalkService) {}

  ngOnInit(): void {
    this.auth$ = this.store.pipe(select(loginSelector));
    this.auth$.subscribe((value) => {
      this.loginUserdata = value;
      this.profile_pic = value?.userData?.user_detail?.partner_photo;
      let userData: ApiResponseDriversResultType = value.userData
        ?.user_detail as any;
      if (userData) {
        let user: TalkUserInterface = {
          id: userData.id,
          username: `${userData?.first_name} ${userData?.last_name}`,
          photoUrl: userData?.partner_photo && userData.partner_photo,
          role: 'default',
        };
        this.talkUnreadMessage(user);
      }
    });
  }

  handleMenu() {
    this.show = !this.show;
  }
  //  talk unread message
  private async talkUnreadMessage(user: TalkUserInterface) {
    const session = await this.talkService.createCurrentSession(user);
    session.unreads.onChange((conversationIds) => {
      let unreadCount = conversationIds.length;
      this.unreadCount = unreadCount;
    });
  }
}
