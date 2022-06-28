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
import { ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteCitiesComponent } from './components/auto-complete-cities/auto-complete-cities.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpHeaderInterceptor } from './interceptors/http-header-interceptor';
import { HttpErrorInterceptor } from './interceptors/http-error-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoaderComponent } from './components/loader/loader.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
