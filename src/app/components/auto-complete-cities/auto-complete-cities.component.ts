import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { citiesType } from 'src/app/shared/Types';
import jsonData from '../../shared/data.json';

@Component({
  selector: 'app-auto-complete-cities',
  templateUrl: './auto-complete-cities.component.html',
})
export class AutoCompleteCitiesComponent implements OnInit, OnChanges {
  cities_data: citiesType[] = jsonData.cities_data;
  isCitySelected: boolean = false;
  /**
   *
   * input and output
   */
  @Input() topstyle!: string;
  @Input() cityKeyword!: string | null;
  @Output() selectedLocationFunc = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  /**
   *
   * ng on change
   *
   */
  ngOnChanges(changes: SimpleChanges): void {
    //  filter the cities name on the base of user search
    if (changes['cityKeyword'].currentValue) {
      if (this.cities_data.length === 0) {
        if (this.isCitySelected === false) {
          this.cities_data = jsonData.cities_data;
          this.cities_data = this.cities_data = this.cities_data.filter(
            (city) =>
              city.name
                .toLowerCase()
                .includes(changes['cityKeyword'].currentValue?.toLowerCase())
          );
        }
      } else {
        this.isCitySelected = false;

        this.cities_data = this.cities_data.filter((city) =>
          city.name
            .toLowerCase()
            .includes(changes['cityKeyword'].currentValue?.toLowerCase())
        );
      }
    } else {
      this.isCitySelected = false;

      this.cities_data = jsonData.cities_data;
    }
  }

  // selected city function
  selectedCity(city: citiesType) {
    this.isCitySelected = true;
    this.cities_data = [];
    this.selectedLocationFunc.emit(city.name);
  }
}
