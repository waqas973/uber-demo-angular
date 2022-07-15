import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home/home.component';
import { NavbarComponent } from './components/navbar/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BannerComponent } from './components/home/banner/banner.component';
import { ServicesComponent } from './components/home/services/services.component';
import { FeaturesComponent } from './components/home/features/features.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignupComponent } from './components/signup/signup.component';
import { SignupModalComponent } from './modals/signup-modal/signup-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteCitiesComponent } from './components/auto-complete-cities/auto-complete-cities.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpHeaderInterceptor } from './interceptors/http-header-interceptor';
import { HttpErrorInterceptor } from './interceptors/http-error-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoaderComponent } from './components/loader/loader.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { LoginComponent } from './components/login/login.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { ResendEmailComponent } from './components/resend-email/resend-email.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { AuthGuardService } from './services/authGuardService';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginAuthGuardService } from './services/loginAuthGuardService';
import { AuthUserSubnavComponent } from './components/navbar/auth-user-subnav/auth-user-subnav.component';
import { AddressPickerComponent } from './components/address-picker/address-picker.component';
import { AutoCompleteSearchComponent } from './components/auto-complete-search/auto-complete-search.component';
import { RideListComponent } from './components/ride-list/ride-list.component';
import { RideDetailComponent } from './components/ride-detail/ride-detail.component';
import { ChatComponent } from './components/chat/chat.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    BannerComponent,
    ServicesComponent,
    FeaturesComponent,
    FooterComponent,
    SignupComponent,
    SignupModalComponent,
    AutoCompleteCitiesComponent,
    LoaderComponent,
    VerifyEmailComponent,
    LoginComponent,
    ResendEmailComponent,
    NewPasswordComponent,
    DashboardComponent,
    AuthUserSubnavComponent,
    AddressPickerComponent,
    AutoCompleteSearchComponent,
    RideListComponent,
    RideDetailComponent,
    ChatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    AuthGuardService,
    LoginAuthGuardService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
