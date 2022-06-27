import { FormControl } from '@angular/forms';
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
  first_name: FormControl<string | null>;
  last_name: FormControl<string | null>;
  email: FormControl<string | null>;
  phone_number: FormControl<string | null>;
  partner_photo: FormControl<string | null>;
  city: FormControl<string | null>;
  vehicle_type: FormControl<string | null>;
  vehicle_registration_book: FormControl<string | null>;
  driving_licence_front_side: FormControl<string | null>;
  password: FormControl<string | null>;
}

export interface citiesType {
  country: string;
  name: string;
  lat: string;
  lng: string;
}
