import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { additionalSignupType, signupType } from '../shared/Types';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  // signup
  public signup(signupData: any): Observable<additionalSignupType> {
    let url = `${environment.API_BASE_URL}/signup/`;
    return this.http.post<additionalSignupType>(url, signupData);
  }

  // verify email

  public verifyEmail(code: any) {
    let url = `${environment.API_BASE_URL}/verify-email/`;
    return this.http.post(url, code);
  }
}
