import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/services/http.service';
import {
  ApiResponsePlacesType,
  centerType,
  featuresType,
} from 'src/app/shared/Types';

@Component({
  selector: 'app-auto-complete-search',
  templateUrl: './auto-complete-search.component.html',
})
export class AutoCompleteSearchComponent implements OnInit, OnChanges {
  cities_data: featuresType[] = [];
  errorMessage: string = '';

  // inputs
  @Input() topstyle!: string;
  @Input() cityKeyword!: string;
  @Input() isApiCall!: boolean;
  @Input() mode!: string;

  // outputs
  @Output() userSelectedPlace = new EventEmitter();

  // constructor
  constructor(private http: HttpService, private toastr: ToastrService) {}

  ngOnInit(): void {}

  /**
   *
   * @param changes
   */

  ngOnChanges(changes: SimpleChanges): void {
    let cityKeyword = changes['cityKeyword']?.currentValue;
    let isApiCall = changes['isApiCall']?.currentValue;
    if (cityKeyword || isApiCall === true) {
      this.fetchPlaces();
    }
  }

  // fetch places
  fetchPlaces() {
    this.errorMessage = '';
    this.http.fetchPlaces(this.cityKeyword).subscribe(
      (place: ApiResponsePlacesType): void => {
        let data = place.features;
        this.cities_data = data;
      },
      () => {
        this.toastr.error('unable to fetch places');
      }
    );
  }

  // user selected location
  userSelectedLocation(place: featuresType) {
    let x = place.center[0];
    let y = place.center[1];
    let label = place.place_name_en;
    let mode = this.mode;

    this.cities_data = [];
    this.userSelectedPlace.emit({ x, y, label, mode });
  }
}
