import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/services/http.service';
import {
  ApiResponseDriversResultType,
  ApiRideRequestType,
} from 'src/app/shared/Types';

@Component({
  selector: 'app-ride-detail',
  templateUrl: './ride-detail.component.html',
})
export class RideDetailComponent implements OnInit {
  isLoading: boolean = false;

  // inputs
  @Input() user!: ApiResponseDriversResultType | null;
  @Input() currentRide!: ApiRideRequestType;
  @Input() isDriver!: boolean;

  @Output() acceptRideDataFunc = new EventEmitter();

  constructor(private http: HttpService, private toastr: ToastrService) {}

  ngOnInit(): void {}

  // cancel ride
  cancelRide(requestid: number | undefined) {
    if (requestid) {
      this.isLoading = true;
      const data = { request_id: requestid, status: '0' };

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

  // finish ride
  finishRide(requestid: number | undefined) {
    if (requestid) {
      this.isLoading = true;

      // Api call
      this.http.finishRide(requestid as number).subscribe(
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
