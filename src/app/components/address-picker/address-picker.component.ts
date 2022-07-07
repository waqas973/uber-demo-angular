import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  faLocationCrosshairs,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { select, Store } from '@ngrx/store';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/services/http.service';
import {
  ApiResponseDriversResultType,
  ApiResponsePlacesType,
  ApiRideRequestType,
  selectedFromType,
} from 'src/app/shared/Types';
import { SelectedLocationsType } from 'src/app/state/reducer/userSelectedLocationsReducer';
import { loginSelector } from 'src/app/state/selectors';
import jsonData from '../../shared/data.json';

@Component({
  selector: 'app-address-picker',
  templateUrl: './address-picker.component.html',
})
export class AddressPickerComponent implements OnInit {
  isFrom: boolean = true;
  faLocationCrosshairs: IconDefinition = faLocationCrosshairs;
  provider!: OpenStreetMapProvider;
  searchinput!: '';
  searchResults: selectedFromType[] = [];
  previousLocation!: SelectedLocationsType;
  ubermini: string = '../../../assets/images/uber-vehicles/ubermini.webp';
  ubermoto: string =
    '../../../assets/images/uber-vehicles/Uber_Moto_Orange.webp';
  uberauto: string = '../../../assets/images/uber-vehicles/uberauto.png';
  icon!: string;
  uberauto_price: { price_per_km: number } = jsonData.uberauto_price;
  ubermoto_price: { price_per_km: number } = jsonData.ubermoto_price;
  ubermini_price: { price_per_km: number } = jsonData.ubermini_price;
  price!: number;
  title!: string;
  isLoading: boolean = false;
  login_user_id?: number;
  account_type?: string;

  @Input() selectedFrom!: selectedFromType | null;
  @Input() selectedTo!: selectedFromType | null;
  @Input() driverResult!: ApiResponseDriversResultType[] | null;
  @Input() selectedPointDistance!: string;
  @Input() rideRequestData!: ApiRideRequestType[] | null;

  @Output() previousLocations = new EventEmitter();
  @Output() driverResultFunc = new EventEmitter();
  @Output() rideRequestDataFunc = new EventEmitter();

  // constructor
  constructor(
    private http: HttpService,
    private toastr: ToastrService,
    private store: Store
  ) {}

  // on init
  ngOnInit(): void {
    this.initProvider();
    // get login user id
    this.store.pipe(select(loginSelector)).subscribe((value) => {
      this.login_user_id = value.userData?.user_detail.id;
      this.account_type = value.userData?.user_detail.account_type;
    });
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
    this.driverResultFunc.emit();
    const input = e;
    this.provider.search({ query: input }).then((results) => {
      this.searchResults = results;
    });
  }

  // selected location
  onLocationSelected(selectedLocation: selectedFromType) {
    if (
      selectedLocation &&
      selectedLocation.label &&
      selectedLocation.x &&
      selectedLocation.y
    ) {
      if (this.isFrom) {
        let data = { ...selectedLocation, mode: 'pickup' };

        // set pick up location.
        this.previousLocations.emit(data);
        this.isFrom = false;
      } else {
        let data = { ...selectedLocation, mode: 'destination' };

        // set destination.
        this.previousLocations.emit(data);
        this.isFrom = true;
      }
      // clear search result.
      this.searchResults = [];
      // reset input value.
      this.searchinput = '';
    }
  }

  /**
   * check vehicle type and set icon and title
   *
   */
  vehicleType(type: string | null) {
    switch (type) {
      case 'ubermini':
        this.title = 'Uber Mini';
        this.icon = this.ubermini;
        this.price =
          this.ubermini_price.price_per_km *
          parseInt(this.selectedPointDistance);
        break;
      case 'ubermoto':
        this.title = 'Uber Moto';
        this.icon = this.ubermoto;
        this.price =
          this.ubermoto_price.price_per_km *
          parseInt(this.selectedPointDistance);

        break;
      case 'uberauto':
        this.title = 'Uber Auto';
        this.icon = this.uberauto;
        this.price =
          this.uberauto_price.price_per_km *
          parseInt(this.selectedPointDistance);
        break;
      default:
        this.title = 'Uber Auto';
        this.icon = this.uberauto;
        this.price =
          this.uberauto_price.price_per_km *
          parseInt(this.selectedPointDistance);
    }
  }

  // get user current location
  getUserCurrentLocation() {
    if ('geolocation' in navigator) {
      this.isLoading = true;
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let long = position.coords.longitude;
          let lat = position.coords.latitude;

          //  call api
          this.http.getCurrentLocation(long, lat).subscribe(
            (result: ApiResponsePlacesType) => {
              let features = result.features[0];

              let label = features.place_name_en;
              let x = features.center[0];
              let y = features.center[1];

              let selectedLocation = { label, x, y };

              let data = { ...selectedLocation, mode: 'pickup' };

              // set pick up location.
              this.previousLocations.emit(data);
              this.isFrom = false;
              // clear search result.
              this.searchResults = [];
              // reset input value.
              this.searchinput = '';
              this.isLoading = false;
            },
            (error) => {
              this.isLoading = false;
              this.toastr.error(error);
            }
          );
        },
        (error) => {
          this.isLoading = false;
          this.toastr.error(error.message);
        }
      );
    } else {
      this.toastr.error('Your device does not support geolocation.');
    }
  }

  /**
   * request ride
   */
  requestRide(driverid: number) {
    if (
      this.selectedFrom &&
      this.selectedFrom.label &&
      this.selectedFrom.x &&
      this.selectedFrom.y &&
      this.selectedTo &&
      this.selectedTo.label &&
      this.selectedTo.x &&
      this.selectedTo.y
    ) {
      this.isLoading = true;
      const data: ApiRideRequestType = {
        destination_label: this.selectedTo.label,
        pickup_label: this.selectedFrom.label,
        destination_coordinates: `${this.selectedTo.x}, ${this.selectedTo.y}`,
        pickup_coordinates: `${this.selectedFrom.x}, ${this.selectedFrom.y}`,
        status: '0',
        requester: this.login_user_id,
        deriver: driverid,
      };

      // ride request Api
      this.http.rideRequest(data).subscribe(
        (result: { response: ApiRideRequestType }) => {
          this.rideRequestDataFunc.emit();
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          this.toastr.error(error);
        }
      );
    }
  }

  /**
   * cancel ride
   *
   */
  cancelRide() {
    let requestid: number | undefined;

    if (this.rideRequestData?.[0]) {
      requestid = this.rideRequestData[0].id && this.rideRequestData[0].id;
      this.isLoading = true;
      const data = { request_id: requestid, status: '0' };

      // Api call
      this.http.cancelRequest(data).subscribe(
        () => {
          this.rideRequestDataFunc.emit();
          this.isLoading = false;
        },
        () => {
          this.isLoading = false;
          this.toastr.error('unable to cancel ride');
        }
      );
    }
  }
}
