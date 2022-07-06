import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  additionalSignupType,
  ApiResponseDriversResultType,
  ApiResponsePlacesType,
  ApiRideRequestType,
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
  // fetch places
  public fetchPlaces(keyword: string): Observable<ApiResponsePlacesType> {
    let url = `${environment.MAPBOX_BASE_URL}/geocoding/v5/mapbox.places/${keyword}.json?country=pk&language=en&autocomplete=true&fuzzyMatch=true&access_token=${environment.MAPBOX_TOKEN}`;
    return this.http.get<ApiResponsePlacesType>(url);
  }

  // current location of user
  public getCurrentLocation(
    long: number,
    lat: number
  ): Observable<ApiResponsePlacesType> {
    let url = `${environment.MAPBOX_BASE_URL}/geocoding/v5/mapbox.places/${long},${lat}.json?country=pk&language=en&limit=1&access_token=${environment.MAPBOX_TOKEN}`;
    return this.http.get<ApiResponsePlacesType>(url);
  }

  // drivers result
  public pick_drop(
    pick: string,
    destination: string
  ): Observable<{ drivers: ApiResponseDriversResultType[] }> {
    let url = `${environment.API_BASE_URL}/pick_drop/`;
    return this.http.post<{ drivers: ApiResponseDriversResultType[] }>(url, {
      pick,
      destination,
    });
  }

  // ride request
  public rideRequest(
    rider_request_data: ApiRideRequestType
  ): Observable<{ response: ApiRideRequestType }> {
    let url = `${environment.API_BASE_URL}/rider_request/`;
    return this.http.post<{ response: ApiRideRequestType }>(
      url,
      rider_request_data
    );
  }

  // ride request
  public previousRideRequest() {
    let url = `${environment.API_BASE_URL}/requests/`;
    return this.http.get(url);
  }
}
