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
