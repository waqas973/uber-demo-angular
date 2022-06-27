import { Component, OnInit } from '@angular/core';
import { ServiceType } from 'src/app/shared/Types';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
})
export class ServicesComponent implements OnInit {
  mockServicesData: ServiceType[] = [
    {
      id: 1,
      image:
        '../../../../assets/images/services/pexels-oleksandr-pidvalnyi-376729.jpg',
      title: 'Our commitment to your safety',
      text: 'With every safety feature and every standard in our Community Guidelines, we’re committed to helping to create a safe environment for our users.',
      link: 'Read about our Community Guidelines',
    },
    {
      id: 2,
      image: '../../../../assets/images/services/pexels-pixabay-210182.jpg',
      title: 'Setting 10,000+ cities in motion',
      text: 'The app is available in thousands of cities worldwide, so you can request a ride even when you’re far from home.',
      link: 'View all cities',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
