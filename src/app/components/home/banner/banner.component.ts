import { Component, OnInit } from '@angular/core';
import {
  faSignal,
  IconDefinition,
  faCar,
  faLocationCrosshairs,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
})
export class BannerComponent implements OnInit {
  activeMenu: number = 0;
  faSignal: IconDefinition = faSignal;
  faCar: IconDefinition = faCar;
  faLocationCrosshairs: IconDefinition = faLocationCrosshairs;

  constructor() {}

  ngOnInit(): void {}

  handleActiveMenu() {
    if (this.activeMenu === 0) {
      this.activeMenu = 1;
    } else {
      this.activeMenu = 0;
    }
  }
}
