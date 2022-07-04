import { Component, OnInit } from '@angular/core';
import {
  faSignal,
  IconDefinition,
  faCar,
  faLocationCrosshairs,
} from '@fortawesome/free-solid-svg-icons';
import { selectedFromType } from 'src/app/shared/Types';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
})
export class BannerComponent implements OnInit {
  activeMenu: number = 0;
  faSignal: IconDefinition = faSignal;
  faCar: IconDefinition = faCar;
  faLocationCrosshairs: IconDefinition = faLocationCrosshairs;
  searchPickup!: string;
  searchDestination!: string;
  tostyle: string = '100%';
  mode: string = '';
  pickupKeyword: string = '';
  destinationKeyword: string = '';
  isPickApiCall: boolean = false;
  isDestinationApiCall: boolean = false;
  selectedPickupLocation: string = '';
  selectedDestinationLocation: string = '';
  selectedPickupLocationCoordinates: any = '';
  selectedDestinationLocationCoordinates: any = '';

  constructor() {}

  ngOnInit(): void {}

  // toggle active menu
  handleActiveMenu() {
    if (this.activeMenu === 0) {
      this.activeMenu = 1;
    } else {
      this.activeMenu = 0;
    }
  }

  // on input change
  onInputChanged(e: string, mode: string) {
    if (mode === 'pickup') {
      this.isPickApiCall = true;
      this.pickupKeyword = e;
      this.selectedPickupLocation = '';
      this.selectedDestinationLocationCoordinates = '';
    } else {
      this.isDestinationApiCall = true;
      this.destinationKeyword = e;
      this.selectedDestinationLocation = '';
      this.selectedDestinationLocationCoordinates = '';
    }
  }

  // user selected location
  userSelectedPlace(place: selectedFromType) {
    if (place.mode === 'pickup') {
      this.searchPickup = place.label;
      this.selectedPickupLocation = place.label;
      this.isPickApiCall = false;
    }
    if (place.mode === 'destination') {
      this.searchDestination = place.label;
      this.selectedDestinationLocation = place.label;
      this.isDestinationApiCall = false;
    }
  }
}
