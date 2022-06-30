import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/services/http.service';
import {
  additionalSignupType,
  signupFormType,
  vehicleType,
} from 'src/app/shared/Types';
import jsonData from '../../shared/data.json';

// Component
@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html',
})

// main class
export class SignupModalComponent implements OnInit, OnChanges, OnDestroy {
  // properties
  vehicleTypes: vehicleType[] = jsonData.vehicle_type;
  signupForm!: signupFormType;
  topstyle: string = '100%';
  cityKeyword: string | null = '';
  selectedLocation!: string;
  isCityNotSelected: boolean = false;
  partner_photo_error: string = '';
  partner_photo_file!: File;
  vehicle_registration_book_error: string = '';
  vehicle_registration_book_file!: File;
  driving_licence_front_side_error: string = '';
  driving_licence_front_side_file!: File;
  error_message: string = '';
  loading: boolean = false;

  /**
   *
   *  @Input and @Output
   */
  @Input() showModal!: boolean;
  @Input() mode!: string;
  @Output() closeModalEvent = new EventEmitter<boolean>();

  // constructor
  constructor(
    private fb: FormBuilder,
    private httpClient: HttpService,
    private toastr: ToastrService,
    private _router: Router
  ) {}

  /**
   *
   *  getter functions
   *
   */
  get firstName() {
    return this.signupForm?.get('first_name');
  }
  get lastName() {
    return this.signupForm?.get('last_name');
  }
  get email() {
    return this.signupForm?.get('email');
  }
  get phoneNumber() {
    return this.signupForm?.get('phone_number');
  }
  get partnerPhoto() {
    return this.signupForm?.get('partner_photo');
  }
  get city() {
    return this.signupForm?.get('city');
  }
  get vehicleType() {
    return this.signupForm?.get('vehicle_type');
  }
  get vehicleRegBook() {
    return this.signupForm?.get('vehicle_registration_book');
  }
  get drivingLicence() {
    return this.signupForm?.get('driving_licence_front_side');
  }
  get password() {
    return this.signupForm?.get('password');
  }

  /**
   *   ng On Init
   *
   */

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone_number: ['', [Validators.required]],
      partner_photo: ['', [Validators.required]],
      city: [''],
      vehicle_type: ['ubermini', [Validators.required]],
      vehicle_registration_book: [''],
      driving_licence_front_side: [''],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/
          ),
        ],
      ],
    }) as signupFormType;

    // track for change the value of city input field
    this.city?.valueChanges.subscribe((value: string | null): void => {
      if (this.selectedLocation !== value) {
        this.selectedLocation = '';
      }
      this.cityKeyword = value;
    });
  }

  /**
   *
   * ng On Change
   *
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mode']?.currentValue === 'drive') {
      this.city?.setValidators(Validators.required);
      this.vehicleRegBook?.setValidators(Validators.required);
      this.drivingLicence?.setValidators(Validators.required);
    } else {
      this.city?.clearValidators();
      this.vehicleRegBook?.clearValidators();
      this.drivingLicence?.clearValidators();
    }
  }

  closeModal() {
    this.isCityNotSelected = false;
    this.city?.clearValidators();
    this.vehicleRegBook?.clearValidators();
    this.drivingLicence?.clearValidators();
    this.signupForm.reset();
    this.closeModalEvent.emit(false);
  }

  // selected location func
  selectedLocationFunc(value: string) {
    this.isCityNotSelected = false;
    this.selectedLocation = value;
    this.city?.setValue(value);
  }

  // check if image upload and valide image
  uploadImage(file: Event, filemode: string) {
    if (this.partner_photo_error && filemode === 'partner_photo') {
      this.partner_photo_error = '';
    }
    if (
      this.vehicle_registration_book_error &&
      filemode === 'vehicle_registration_book'
    ) {
      this.vehicle_registration_book_error = '';
    }
    if (
      this.driving_licence_front_side_error &&
      filemode === 'driving_licence_front_side'
    ) {
      this.driving_licence_front_side_error = '';
    }

    const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    let image = (file.target as HTMLInputElement).files as FileList;

    if (image.length > 0) {
      if (acceptedImageTypes.includes(image[0].type)) {
        if (filemode === 'partner_photo') {
          this.partner_photo_file = image[0];
        }
        if (filemode === 'vehicle_registration_book') {
          this.vehicle_registration_book_file = image[0];
        }
        if (filemode === 'driving_licence_front_side') {
          this.driving_licence_front_side_file = image[0];
        }
      } else {
        if (filemode === 'partner_photo') {
          this.partner_photo_error = 'only png, jpeg , jpg image are allowed';
        }
        if (filemode === 'vehicle_registration_book') {
          this.vehicle_registration_book_error =
            'only png, jpeg , jpg image are allowed';
        }
        if (filemode === 'driving_licence_front_side') {
          this.driving_licence_front_side_error =
            'only png, jpeg , jpg image are allowed';
        }
      }
    } else {
      if (filemode === 'partner_photo') {
        this.partner_photo_error = 'This required is required';
      }
      if (filemode === 'vehicle_registration_book') {
        this.vehicle_registration_book_error = 'This required is required';
      }
      if (filemode === 'driving_licence_front_side') {
        this.driving_licence_front_side_error = 'This required is required';
      }
    }
  }

  // submit form data function
  onSubmit() {
    // check for mode
    if (this.mode === 'drive') {
      this.validateDriveFields();
    } else {
      this.valideRideFields();
    }
  }

  // validate additional drive fields
  validateDriveFields() {
    if (this.selectedLocation) {
      this.isCityNotSelected = false;

      if (
        !this.partner_photo_error &&
        !this.vehicle_registration_book_error &&
        !this.driving_licence_front_side_error
      ) {
        let account_type = 'drive_and_deliver';
        let { first_name, last_name, email, phone_number, password } =
          this.signupForm.value;
        const postingData = {
          first_name,
          last_name,
          email,
          phone_number,
          password,
          account_type,
          city: this.selectedLocation,
        };
        this.submitFormData(postingData);
      }
    } else {
      this.isCityNotSelected = true;
    }
  }

  // validate  additional ride fields
  valideRideFields() {
    if (!this.partner_photo_error) {
      let account_type = 'rider';
      let { first_name, last_name, email, phone_number, password } =
        this.signupForm.value;
      const postingData = {
        first_name,
        last_name,
        email,
        phone_number,
        password,
        account_type,
      };
      this.submitFormData(postingData);
    }
  }

  /**
   * submit form data
   */

  submitFormData(data: additionalSignupType) {
    this.loading = true;
    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key as keyof additionalSignupType]!);
    }

    if (this.partner_photo_file) {
      formData.append('partner_photo', this.partner_photo_file);
    }

    if (this.vehicle_registration_book_file) {
      formData.append(
        'vehicle_registration_book',
        this.vehicle_registration_book_file
      );
    }

    if (this.driving_licence_front_side_file) {
      formData.append(
        'driving_licence_front_side',
        this.driving_licence_front_side_file
      );
    }

    // Api call
    this.httpClient.signup(formData).subscribe(
      () => {
        this.loading = false;
        this._router.navigate(['verify-email']);
      },
      (err) => {
        this.loading = false;
        this.toastr.error(err);
      }
    );
  }

  /**
   *
   *   ng On Destroy
   */

  ngOnDestroy(): void {
    this.city?.clearValidators();
    this.vehicleRegBook?.clearValidators();
    this.drivingLicence?.clearValidators();
    this.signupForm.reset();
  }
}
