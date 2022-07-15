import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Talk from 'talkjs';
import { TalkUserInterface } from '../shared/Types';

@Injectable({
  providedIn: 'root',
})
export class TalkService {
  private currentUser!: Talk.User;

  constructor() {}

  async createUser(applicationUser: TalkUserInterface) {
    await Talk.ready;
    return new Talk.User({
      id: applicationUser.id,
      name: applicationUser.username,
      photoUrl: applicationUser.photoUrl,
      role: applicationUser.role,
    });
  }

  async createCurrentSession(user: TalkUserInterface) {
    await Talk.ready;
    this.currentUser = await this.createUser(user);
    const session = new Talk.Session({
      appId: environment.APP_ID,
      me: this.currentUser,
    });
    return session;
  }

  private async getOrCreateConversation(
    session: Talk.Session,
    otherApplicationUser: TalkUserInterface
  ) {
    const otherUser = await this.createUser(otherApplicationUser);
    const conversation = session.getOrCreateConversation(
      Talk.oneOnOneId(this.currentUser, otherUser)
    );
    conversation.setParticipant(this.currentUser);
    conversation.setParticipant(otherUser);
    return conversation;
  }

  async createInbox(
    session: Talk.Session,
    otherApplicationUser: TalkUserInterface
  ) {
    const conversation = await this.getOrCreateConversation(
      session,
      otherApplicationUser
    );
    const inbox = session.createChatbox();
    inbox.select(conversation);
    return inbox;
  }
}
