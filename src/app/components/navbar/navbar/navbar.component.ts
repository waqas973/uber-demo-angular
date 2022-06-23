import { Component, OnInit } from '@angular/core';
import {
  faBars,
  faXmark,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  faBars: IconDefinition = faBars;
  faXmark: IconDefinition = faXmark;
  show: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  handleMenu() {
    this.show = !this.show;
  }
}
