import { Component, OnInit } from '@angular/core';
import {
  faArrowRight,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {
  faArrowRight: IconDefinition = faArrowRight;
  showModal: boolean = false;
  mode: string = 'rider';

  constructor() {}

  ngOnInit(): void {}

  // toggle modal
  openModal(value: string): void {
    this.showModal = true;
    this.mode = value;
  }

  closeModal(value: boolean) {
    this.showModal = value;
    this.mode = 'rider';
  }
}
