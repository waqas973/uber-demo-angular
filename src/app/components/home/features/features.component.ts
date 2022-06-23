import { Component, OnInit } from '@angular/core';
import {
  faBook,
  faHomeAlt,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import { featureType } from 'src/app/Types';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
})
export class FeaturesComponent implements OnInit {
  featuresMockData: featureType[] = [
    {
      id: 1,
      icon: faUserGroup,
      title: 'About',
      text: 'Find out how we started, what drives us, and how we’re reimagining how the world moves.',
      link: 'Learn more about Uber',
    },
    {
      id: 2,
      icon: faBook,
      title: 'Newsroom',
      text: 'See announcements about our latest releases, initiatives, and partnerships.',
      link: 'Go to Newsroom',
    },
    {
      id: 3,

      icon: faHomeAlt,
      title: 'Global citizenship',
      text: 'Read about our commitment to making a positive impact in the cities we serve.',
      link: 'See our partnerships',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
