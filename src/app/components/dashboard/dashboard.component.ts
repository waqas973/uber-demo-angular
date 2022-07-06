import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { select, Store } from '@ngrx/store';
import L from 'leaflet';
import 'leaflet-routing-machine';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import {
  ApiResponseDriversResultType,
  ApiRideRequestType,
  selectedFromType,
} from 'src/app/shared/Types';
import { loginStateType } from 'src/app/state/reducer/loginReducer';
import {
  loginSelector,
  selectedLocationsSelector,
} from 'src/app/state/selectors';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnChanges {
  map!: L.Map;
  routeControl: any;
  authUser$!: Observable<loginStateType>;
  isUser: boolean = false;
  currentRide: any;
  selectedTo!: selectedFromType | null;
  selectedFrom!: selectedFromType | null;
  isLoading: boolean = false;
  driverResult: ApiResponseDriversResultType[] | null = null;
  selectedPointDistance!: string;
  rideRequest: any = null;
  rideRequestData: ApiRideRequestType | null = null;

  constructor(
    private store: Store,
    private http: HttpService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initMap();
    this.initRouteControl();
    // get login user detail from ngrx store
    this.authUser$ = this.store.pipe(select(loginSelector));
    this.authUser$.subscribe((value) => {
      this.isUser =
        value.IsUserLogIn === true &&
        value.userData?.user_detail?.account_type === 'rider';
    });

    this.store.pipe(select(selectedLocationsSelector)).subscribe((value) => {
      if (value.pickupLocation && value.destinationLocation) {
        let pickup = value.pickupLocation;
        let destination = value.destinationLocation;
        this.selectedFrom = pickup;
        this.selectedTo = destination;
        if (this.isUser) {
          this.drawRoute(this.selectedFrom!, this.selectedTo!);
        }
      }
    });

    // call recent ride request function
    this.rideRequests();
  }

  // on OnChanges
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  /**
   * init leaflet map.
   */

  initMap() {
    this.map = L.map('map', {
      center: [31.582045, 74.329376],
      zoom: 13,
      layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }),
      ],
    });
  }

  /**
   * init route control.
   */
  initRouteControl() {
    this.routeControl = L.Routing.control({
      show: true,
      fitSelectedRoutes: true,
      plan: undefined,
      lineOptions: {
        styles: [
          {
            color: 'blue',
            opacity: 0.7,
            weight: 6,
          },
        ],
        extendToWaypoints: true,
        missingRouteTolerance: 0,
      },

      router: L.Routing.mapbox(environment.MAPBOX_TOKEN, {}),
    })
      .addTo(this.map)
      .getPlan();
  }

  // previous pickup and destination location
  previousLocations(value: selectedFromType) {
    if (value.mode === 'pickup') {
      this.selectedFrom = value;
    } else if (value.mode === 'destination') {
      this.selectedTo = value;
    }
    this.drawRoute(this.selectedFrom!, this.selectedTo!);
  }

  /**
   * draw route on map.
   */
  drawRoute(from: selectedFromType, to: selectedFromType) {
    if (this.shouldRouteDrawed(from, to) && this.routeControl) {
      this.isLoading = true;
      const fromLatLng = new L.LatLng(from.y, from.x);
      const toLatLng = new L.LatLng(to.y, to.x);
      this.routeControl.setWaypoints([fromLatLng, toLatLng]);
      let distance = fromLatLng.distanceTo(toLatLng) / 1000;

      let pick = from.label;
      let destination = to.label;

      this.http.pick_drop(pick, destination).subscribe(
        (result: { drivers: ApiResponseDriversResultType[] }) => {
          this.driverResult = result.drivers;
          this.selectedPointDistance = distance.toFixed(2);

          this.isLoading = false;
        },
        () => {
          this.isLoading = false;
          this.toastr.error('Something went wrong, please try again later.');
        }
      );
    }
  }

  /**
   * check a route should be drawed, or not.
   * @param {*} selectedFrom
   * @param {*} selectedTo
   */
  shouldRouteDrawed(
    selectedFrom: selectedFromType,
    selectedTo: selectedFromType
  ) {
    return (
      selectedFrom &&
      selectedTo &&
      selectedFrom.label &&
      selectedTo.label &&
      selectedFrom.x &&
      selectedTo.x &&
      selectedFrom.y &&
      selectedTo.y
    );
  }

  // make driver result null
  driverResultFunc() {
    this.driverResult = null;
  }

  // update ride request data properties
  rideRequestDataFunc(data: ApiRideRequestType) {
    this.rideRequestData = data;
    this.rideRequests();
  }

  // recent ride requests
  rideRequests() {
    this.http.previousRideRequest().subscribe(
      (result) => {
        console.log(result);
        // if (res.data.response.length > 0) {
        //   setRideRequestData(res.data.response);
        //   setRideRequest(res.data.response);
        // } else {
        //   setRideRequestData(null);
        //   setRideRequest(null);
        // }
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }
}
