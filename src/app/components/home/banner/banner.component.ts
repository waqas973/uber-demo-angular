import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faSignal,
  IconDefinition,
  faCar,
  faLocationCrosshairs,
} from '@fortawesome/free-solid-svg-icons';
import { select, Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/services/http.service';
import { ApiResponsePlacesType, selectedFromType } from 'src/app/shared/Types';
import { userSelectedLocationsAction } from 'src/app/state/actions/actions';
import { loginSelector } from 'src/app/state/selectors';

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
  selectedPickupLocationCoordinates: {
    x: number ;
    y: number ;
  } | null = null;
  selectedDestinationLocationCoordinates: {
    x: number ;
    y: number;
  } | null = null;
  errorMessage: string = '';
  isLoginUser: boolean = false;
  isLoading: boolean = false;

  // constructor
  constructor(
    private store: Store,
    private router: Router,
    private toastr: ToastrService,
    private http: HttpService
  ) {}

  //  on init
  ngOnInit(): void {
    this.store.pipe(select(loginSelector)).subscribe((value) => {
      this.isLoginUser = value.IsUserLogIn;
    });
  }

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
      this.selectedDestinationLocationCoordinates = null;
    } else {
      this.isDestinationApiCall = true;
      this.destinationKeyword = e;
      this.selectedDestinationLocation = '';
      this.selectedDestinationLocationCoordinates = null;
    }
  }

  // user selected location
  userSelectedPlace(place: selectedFromType) {
    if (place.mode === 'pickup') {
      let x = place.x;
      let y = place.y;
      this.searchPickup = place.label;
      this.selectedPickupLocation = place.label;
      this.selectedPickupLocationCoordinates = { x, y };
      this.isPickApiCall = false;
    }
    if (place.mode === 'destination') {
      let x = place.x;
      let y = place.y;
      this.searchDestination = place.label;
      this.selectedDestinationLocation = place.label;
      this.selectedDestinationLocationCoordinates = { x, y };
      this.isDestinationApiCall = false;
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

              this.searchPickup = features.place_name_en;
              this.selectedPickupLocation = features.place_name_en;

              let x = features.center[0];
              let y = features.center[1];
              this.selectedPickupLocationCoordinates = { x, y };
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

  //  request a ride handler
  requestRideHander() {
    this.errorMessage = '';
    if (!this.selectedPickupLocation || !this.selectedDestinationLocation) {
      this.errorMessage =
        'Please select pickup and destination location from dropdown list';
      return;
    }


    let pickupLocation: {label: string , x: number   , y: number  } |  null = {
      label: this.selectedPickupLocation,
      x:  this.selectedPickupLocationCoordinates! &&  this.selectedPickupLocationCoordinates.x,
      y:
        this.selectedPickupLocationCoordinates! &&
        this.selectedPickupLocationCoordinates.y,
    };

    let destinationLocation: {label: string , x: number   , y: number  } |  null = {
      label: this.selectedDestinationLocation,
      x:
        this.selectedDestinationLocationCoordinates! &&
        this.selectedDestinationLocationCoordinates.x,
      y:
        this.selectedDestinationLocationCoordinates! &&
        this.selectedDestinationLocationCoordinates.y,
    };

    // dispatch location
    this.store.dispatch(
      userSelectedLocationsAction({
        payload:  { pickupLocation , destinationLocation },
      })
    );

    // check user login or not
    if (this.isLoginUser) {
      this.router.navigateByUrl('dashboard');
    } else {
      this.router.navigateByUrl('login');
    }
  }
}
