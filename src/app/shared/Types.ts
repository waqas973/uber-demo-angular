import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface ServiceType {
  id: number;
  image?: string;
  title: string;
  text: string;
  link: string;
}

export interface featureType extends ServiceType {
  icon: IconDefinition;
}

export interface companyMockData {
  text: string;
}

export interface vehicleType {
  id: number;
  text: string;
  value: string;
}

export interface signupType {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  partner_photo?: string;
  password: string;
}

export interface additionalSignupType extends signupType {
  city?: string;
  vehicle_type?: string;
  vehicle_registration_book?: string;
  driving_licence_front_side?: string;
  account_type?: string;
}

export interface signupFormType extends FormGroup {
  value: additionalSignupType;

  controls: {
    first_name: AbstractControl;
    last_name: AbstractControl;
    email: AbstractControl;
    phone_number: AbstractControl;
    partner_photo?: AbstractControl;
    password: AbstractControl;
    city?: AbstractControl;
    vehicle_type?: AbstractControl;
    vehicle_registration_book?: AbstractControl;
    driving_licence_front_side?: AbstractControl;
  };
}

export interface loginType {
  email: string;
  password: string;
}

export interface loginFormType extends FormGroup {
  value: loginType;

  controls: {
    email: AbstractControl;
    password: AbstractControl;
  };
}

export interface resendEmailFormType extends FormGroup {
  value: { email: string };

  controls: {
    email: AbstractControl;
  };
}

export interface resendEmailApiResponse {
  status?: string;
  response?: string;
}

export interface newPasswordFormType extends FormGroup {
  value: { password: string; token: string };

  controls: {
    password: AbstractControl;
    token: AbstractControl;
  };
}

export interface loginApiResponseType {
  access?: string;
  refresh?: string;
  user_detail: additionalSignupType & { id: number };
}

export interface citiesType {
  country: string;
  name: string;
  lat: string;
  lng: string;
}

export interface selectedFromType {
  label: string;
  x: number;
  y: number;
  mode?: string;
}

type place_name_enType = string;
export type centerType = [number, number];

export type featuresType = {
  place_name_en: place_name_enType;
  center: centerType;
};
export interface ApiResponsePlacesType {
  features: featuresType[];
}

export interface ApiResponseDriversResultType {
  account_type: string;
  city: string | null;
  driving_licence_front_side: string | null;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  partner_photo: string;
  phone_number: string;
  username: string;
  vehicle: null | string;
  vehicle_registration_book: string | null;
}

export interface ApiRideRequestType {
  deriver: number;
  destination_coordinates: `${number}, ${number}`;
  destination_label: string;
  pickup_coordinates: `${number}, ${number}`;
  pickup_label: string;
  requester?: number;
  status: string;
}
