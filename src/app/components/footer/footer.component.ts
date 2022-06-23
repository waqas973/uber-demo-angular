import { Component, OnInit } from '@angular/core';
import { companyMockData } from 'src/app/Types';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {
  companyMockData: companyMockData[] = [
    { text: 'About us' },
    { text: 'Our offerings' },
    { text: 'Newsroom' },
    { text: 'Investors' },
    { text: 'Blog' },
    { text: 'Careers' },
    { text: 'AI' },
  ];

  productMockData: companyMockData[] = [
    { text: 'Ride' },
    { text: 'Drive' },
    { text: 'Eat' },
    { text: 'Uber for Business' },
  ];

  year: number = new Date().getFullYear();

  constructor() {}

  ngOnInit(): void {}
}
