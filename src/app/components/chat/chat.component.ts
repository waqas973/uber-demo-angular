import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import Talk from 'talkjs';

import { HttpService } from 'src/app/services/http.service';
import { TalkService } from 'src/app/services/talk.service';
import {
  additionalSignupType,
  ApiResponseDriversResultType,
  ApiRideRequestType,
  TalkUserInterface,
} from 'src/app/shared/Types';
import { loginSelector } from 'src/app/state/selectors';
import { faArrowLeft, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit {
  faArrowLeft: IconDefinition = faArrowLeft;
  loginUserId?: number;
  user_detail?: additionalSignupType | null;
  isLoading: boolean = false;
  private inbox!: Talk.Chatbox;

  constructor(
    private store: Store,
    private http: HttpService,
    private toastr: ToastrService,
    private talkService: TalkService
  ) {}

  @ViewChild('talkjsContainer') talkjsContainer!: ElementRef;

  ngOnInit(): void {
    // get login user detail from ngrx store
    this.store.pipe(select(loginSelector)).subscribe((value) => {
      this.loginUserId = value.userData?.user_detail.id;
      this.user_detail = value.userData?.user_detail;
      this.acceptedRide();
    });
  }

  private async createInbox(
    currentUser: TalkUserInterface,
    otherUser: TalkUserInterface
  ) {
    const session = await this.talkService.createCurrentSession(currentUser);
    this.inbox = await this.talkService.createInbox(session, otherUser);
    this.inbox.mount(this.talkjsContainer.nativeElement);
    this.isLoading = false;
  }

  // recent accepted ride
  acceptedRide() {
    if (this.loginUserId) {
      this.isLoading = true;
      this.http.previousAcceptedRide(this.loginUserId).subscribe(
        (result: { response: ApiRideRequestType[] }) => {
          if (result.response.length > 0) {
            // for talkjs purpose
            const requestorData = result.response[0]
              .requester as ApiResponseDriversResultType;
            const driverData = result.response[0]
              .deriver as ApiResponseDriversResultType;
            let currentUser;
            let otherUser;
            // check the account type
            if (this.user_detail?.account_type === 'drive_and_deliver') {
              let chatUser = this.fillUserDataForChat(
                driverData,
                requestorData
              );
              currentUser = chatUser[0];
              otherUser = chatUser[1];
            } else if (this.user_detail?.account_type === 'rider') {
              let chatUser = this.fillUserDataForChat(
                requestorData,
                driverData
              );
              currentUser = chatUser[0];
              otherUser = chatUser[1];
            }
            //  sending users to talkChat
            if (currentUser && otherUser) {
              this.createInbox(currentUser, otherUser);
            }
          } else {
            this.isLoading = false;
          }
        },
        (error) => {
          this.isLoading = false;
          this.toastr.error(error);
        }
      );
    }
  }

  // fill user data for create chat room
  fillUserDataForChat(
    current_user: ApiResponseDriversResultType,
    other_user: ApiResponseDriversResultType
  ): [TalkUserInterface, TalkUserInterface] {
    let currentUser: TalkUserInterface = {
      id: current_user.id,
      username: current_user.username,
      photoUrl: current_user.partner_photo && current_user.partner_photo,
      role: 'default',
    };
    let otherUser: TalkUserInterface = {
      id: other_user.id,
      username: other_user.username,
      photoUrl: other_user.partner_photo && other_user.partner_photo,
      role: 'default',
    };

    return [currentUser, otherUser];
  }
}
