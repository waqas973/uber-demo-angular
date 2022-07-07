import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/services/http.service';
import { ApiRideRequestType } from 'src/app/shared/Types';

@Component({
  selector: 'app-ride-list',
  templateUrl: './ride-list.component.html',
})
export class RideListComponent implements OnInit {
  isLoading: boolean = false;

  // inputs
  @Input() rideRequest!: ApiRideRequestType[] | null;
  @Input() rideRequestData!: ApiRideRequestType[] | null;
  @Input() currentRide!: ApiRideRequestType | null;

  @Output() acceptRideDataFunc = new EventEmitter();

  constructor(private toastr: ToastrService, private http: HttpService) {}

  ngOnInit(): void {}

  //  accept ride
  acceptRide(request_id: number | undefined) {
    if (request_id) {
      this.isLoading = true;
      const data = { request_id: request_id, status: '1' };

      // Api call
      this.http.cancelRequest(data).subscribe(
        () => {
          this.acceptRideDataFunc.emit();
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
