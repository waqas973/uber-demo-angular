import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { HomeComponent } from './components/home/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { reducers } from './state/reducer/loginReducer';
import * as actionModeReducer from './state/reducer/actionModeReducer';
import * as selectedLocationsReducer from './state/reducer/userSelectedLocationsReducer';
import { ResendEmailComponent } from './components/resend-email/resend-email.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { AuthGuardService } from './services/authGuardService';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginAuthGuardService } from './services/loginAuthGuardService';
import { ChatComponent } from './components/chat/chat.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [LoginAuthGuardService] },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [LoginAuthGuardService],
  },
  {
    path: 'verify-email',
    component: VerifyEmailComponent,
    canActivate: [LoginAuthGuardService],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginAuthGuardService],
  },
  {
    path: 'forget-password',
    component: ResendEmailComponent,
    canActivate: [LoginAuthGuardService],
  },
  {
    path: 'resend-email-code',
    component: ResendEmailComponent,
    canActivate: [LoginAuthGuardService],
  },
  {
    path: 'new-password',
    component: NewPasswordComponent,
    canActivate: [LoginAuthGuardService],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: '**',
    pathMatch: 'full',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    StoreModule.forFeature('login', reducers),
    StoreModule.forFeature('actionMode', actionModeReducer.reducers),
    StoreModule.forFeature(
      'selectedLocations',
      selectedLocationsReducer.reducers
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
