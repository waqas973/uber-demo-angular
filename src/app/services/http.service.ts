import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  additionalSignupType,
  loginApiResponseType,
  loginType,
  resendEmailApiResponse,
} from '../shared/Types';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  // signup
  public signup(signupData: FormData): Observable<additionalSignupType> {
    let url = `${environment.API_BASE_URL}/signup/`;
    return this.http.post<additionalSignupType>(url, signupData);
  }
  // login
  public login(loginData: loginType): Observable<loginApiResponseType> {
    let url = `${environment.API_BASE_URL}/jwt-login/`;
    return this.http.post<loginApiResponseType>(url, loginData);
  }
  // current login user
  public currentLoginUser(): Observable<loginApiResponseType> {
    let url = `${environment.API_BASE_URL}/profile/`;
    return this.http.get<loginApiResponseType>(url);
  }

  // verify email
  public verifyEmail(code: { code: string | null | undefined }) {
    let url = `${environment.API_BASE_URL}/verify-email/`;
    return this.http.post(url, code);
  }

  // resend email
  public resendEmail(
    lastUrl: string,
    email: { email: string }
  ): Observable<resendEmailApiResponse> {
    let url = `${environment.API_BASE_URL}${lastUrl}`;
    return this.http.post<resendEmailApiResponse>(url, email);
  }

  // new password
  public newPassword(data: { password: string; token: string }) {
    let url = `${environment.API_BASE_URL}/forgot-password/confirm/`;
    return this.http.post(url, data);
  }
}
