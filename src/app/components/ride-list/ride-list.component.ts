import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ride-list',
  templateUrl: './ride-list.component.html',
})
export class RideListComponent implements OnInit {
  @Input() rideRequest: any;
  @Input() rideRequestData: any;
  @Input() currentRide: any;

  constructor() {}

  ngOnInit(): void {}
}
