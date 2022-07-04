import { Component, Input, OnInit } from '@angular/core';
import {
  faLocationCrosshairs,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { selectedFromType } from 'src/app/shared/Types';

@Component({
  selector: 'app-address-picker',
  templateUrl: './address-picker.component.html',
})
export class AddressPickerComponent implements OnInit {
  isFrom: boolean = true;
  faLocationCrosshairs: IconDefinition = faLocationCrosshairs;
  provider!: OpenStreetMapProvider;
  searchinput!: Event;
  searchResults: selectedFromType[] = [];

  @Input() selectedFrom!: selectedFromType;
  @Input() selectedTo!: selectedFromType;
  // @Input() driverResult: any ;

  constructor() {}

  ngOnInit(): void {
    this.initProvider();
  }

  // change from function
  changeFrom(value: boolean) {
    this.isFrom = value;
  }

  /**
   * init provider.
   */
  initProvider() {
    this.provider = new OpenStreetMapProvider({
      params: {
        'accept-language': 'en',
        countrycodes: 'pk',
      },
    });
  }

  // /**
  //  * handle input changed to get pick up location or destination.
  //  */
  onInputChanged(e: string) {
    // setDriverResult(null);
    const input = e;
    this.provider.search({ query: input }).then((results) => {
      this.searchResults = results;
    });
  }
}
