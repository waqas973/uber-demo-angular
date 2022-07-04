import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import L from 'leaflet';
import 'leaflet-routing-machine';
import { Observable } from 'rxjs';
import { additionalSignupType, selectedFromType } from 'src/app/shared/Types';
import { loginStateType } from 'src/app/state/reducer/loginReducer';
import { loginSelector } from 'src/app/state/selectors';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  map!: L.Map;
  routeControl: any;
  authUser$!: Observable<loginStateType>;
  isUser: boolean = false;
  currentRide: any;
  selectedTo!: selectedFromType;
  selectedFrom!: selectedFromType;

  constructor(private store: Store) {}

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
}
