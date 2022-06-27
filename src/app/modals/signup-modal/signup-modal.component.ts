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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { signupType, vehicleType } from 'src/app/shared/Types';
import jsonData from '../../shared/data.json';
@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html',
})
export class SignupModalComponent implements OnInit, OnChanges, OnDestroy {
  // properties
  vehicleTypes: vehicleType[] = jsonData.vehicle_type;
  signupForm!: FormGroup<signupType>;
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
  /**
   *
   *  @Input and @Output
   */
  @Input() showModal!: boolean;
  @Input() mode!: string;
  @Output() closeModalEvent = new EventEmitter<boolean>();

  // constructor
  constructor(private fb: FormBuilder) {}

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
    });

    // track for change the value of city input field
    this.city?.valueChanges.subscribe((value) => {
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
  uploadImage(file: any, filemode: string) {
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
    let image = file.files;

    if (image.length > 0) {
      if (acceptedImageTypes.includes(image[0].type)) {
        if (filemode === 'partner_photo') {
          this.partner_photo_file = file.files[0];
        }
        if (filemode === 'vehicle_registration_book') {
          this.vehicle_registration_book_file = file.files[0];
        }
        if (filemode === 'driving_licence_front_side') {
          this.driving_licence_front_side_file = file.files[0];
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
        console.log(this.signupForm.value);
        console.log(this.selectedLocation);
        console.log(this.partner_photo_file);
        console.log(this.vehicle_registration_book_file);
        console.log(this.driving_licence_front_side_file);
      }
    } else {
      this.isCityNotSelected = true;
    }
  }

  // validate  additional ride fields
  valideRideFields() {
    if (!this.partner_photo_error) {
      console.log(this.signupForm.value);
      console.log(this.partner_photo_file);
    }
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
