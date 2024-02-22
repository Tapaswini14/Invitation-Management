import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TmApiService } from 'src/app/shared/tmApi.service';

@Component({
  selector: 'app-business-opening',
  templateUrl: './business-opening.component.html',
  styleUrls: ['./business-opening.component.css'],
})
export class BusinessOpeningComponent {
  selectedFile: File[] = [];
  submitted = false;
  apiStatus: number | undefined;

  usernameValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const pattern = /^[a-zA-Z ]+$/; // Allow both letters and numbers
    const numericPattern = /^[0-9]+$/; // Numeric pattern
    const specialPattern = /^[ $@#%^&*()-+]+$/; //Special Characters

    if (control.value && !pattern.test(control.value)) {
      return { invalidUsername: true };
    }

    if (control.value && numericPattern.test(control.value)) {
      return { numericOnlyUsername: true };
    }

    if (control.value && specialPattern.test(control.value)) {
      return { specialOnlyUsername: true };
    }
    return null;
  }

  specialPatternValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const specialPattern = /^[ $@#%^&*()+-]+$/; // Special Characters (excluding letters, numbers, and other special characters)

    if (control.value && specialPattern.test(control.value.charAt(0))) {
      return { specialCharacterAtBeginning: true };
    }

    return null;
  }

  phoneNumberValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const pattern = /^[0-9]{10}$/; // Assuming a 10-digit phone number format
    if (control.value && !pattern.test(control.value)) {
      return { invalidPhoneNumber: true };
    }
    return null;
  }

  firstFormGroup = this._formBuilder.group({
    biller_name: ['', [Validators.required, this.usernameValidator]],
  });
  secondFormGroup = this._formBuilder.group({
    owner_name: ['', [Validators.required, this.usernameValidator]],
  });
  thirdFormGroup = this._formBuilder.group({
    business_name: ['', [Validators.required, this.usernameValidator]],
  });
  fourthFormGroup = this._formBuilder.group({
    event_date: ['', Validators.required],
    event_time: ['', Validators.required],
    event_address: ['', Validators.required],
  });
  fifthFormGroup = this._formBuilder.group({
    greeting: ['', [Validators.required, this.specialPatternValidator]],
    inviter_name: ['', Validators.required],
    invitee_name1: [''],
    invitee_name2: [''],
  });
  sixthFormGroup = this._formBuilder.group({
    address: [
      '',
      [
        Validators.required,
        this.usernameValidator,
        this.specialPatternValidator,
      ],
    ],
    phone: ['', [Validators.required, this.phoneNumberValidator]],
  });
  seventhFormGroup = this._formBuilder.group({
    specific_info: ['', [Validators.required, this.specialPatternValidator]],
  });

  isNextButtonDisabled(): boolean {
    return this.apiStatus !== 200;
  }

  isFirstFormValid(): boolean {
    return this.firstFormGroup.valid;
  }

  isSecondFormValid(): boolean {
    return this.secondFormGroup.valid;
  }

  isThirdFormValid(): boolean {
    return this.thirdFormGroup.valid;
  }

  isFourthFormValid(): boolean {
    return this.fourthFormGroup.valid;
  }

  isFifthFormValid(): boolean {
    return this.fifthFormGroup.valid;
  }

  isSixthFormValid(): boolean {
    return this.sixthFormGroup.valid;
  }

  isSeventhFormValid(): boolean {
    return this.seventhFormGroup.valid;
  }

  constructor(
    private _formBuilder: FormBuilder,
    private tmApi: TmApiService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  createInvitation() {
    const newData = this.firstFormGroup.value;
    const invitationData = {
      biller_name: newData.biller_name,
      ritual_id: localStorage.getItem('ritualId'),
    };

    this.tmApi.createBusinessInvitation(invitationData).subscribe(
      (response) => {
        this.apiStatus = response.code;
        if (this.apiStatus === 200) {
          this.snackBar.open('Successfully Created Invitation', 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'end',
          });
        } else {
          this.snackBar.open('Failed to Create Invitation', 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'end',
          });
        }
        const invitation_id = response.invitation_id;
        localStorage.setItem('invitation_id', invitation_id);
      },
      (error) => {
        this.snackBar.open('Failed to Create Invitation', 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'end',
        });
      }
    );
  }

  submitOwnerDetails() {
    const formData = this.secondFormGroup.value;
    const newData = {
      business_owner_name: formData.owner_name,
      invitation_id: localStorage.getItem('invitation_id'),
      created_by: sessionStorage.getItem('Id'),
    };
    this.tmApi.registerOwner(newData).subscribe(
      (response: any) => {
        this.apiStatus = response.code;
        if (this.apiStatus === 200) {
          this.snackBar.open('Successfully Added Owner Name', 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'end',
          });
        } else {
          this.snackBar.open('Failed to Owner Name', 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'end',
          });
        }
      },
      (error) => {
        if (error.error.errors.msg) {
          this.snackBar.open(error.error.errors.msg, 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'end',
          });
        } else if (error.error.errors.message) {
          this.snackBar.open(error.error.errors.message, 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'end',
          });
        }
      }
    );
  }

  businessDetails() {
    const formData = new FormData();
    for (let i = 0; i < this.selectedFile.length; i++) {
      formData.append('files[]', this.selectedFile[i]);
    }
    formData.append(
      'invitation_id',
      localStorage.getItem('invitation_id') || ''
    );
    formData.append(
      'business_name',
      this.thirdFormGroup.value.business_name || ''
    );
    this.tmApi.createBusinessDetails(formData).subscribe(
      (response: any) => {
        this.apiStatus = response.code;
        if (this.apiStatus === 200) {
          this.snackBar.open('Successfully Added Business Details', 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'end',
          });
        } else {
          this.snackBar.open('Failed to Business Details', 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'end',
          });
        }
      },
      (error) => {
        if (error.error.errors.msg) {
          this.snackBar.open(error.error.errors.msg, 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'end',
          });
        } else if (error.error.errors.message) {
          this.snackBar.open(error.error.errors.message, 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'end',
          });
        }
      }
    );
  }

  businessEventDetails() {
    const formData = this.fourthFormGroup.value;
    let dateInForm = this.fourthFormGroup.value.event_date;
    if (dateInForm) {
      let currentdate = new Date(dateInForm);
      let datetime =
        currentdate.getFullYear() +
        '-' +
        (currentdate.getMonth() + 1) +
        '-' +
        currentdate.getDate();

      const newData = {
        party_date: datetime,
        party_time: formData.event_time,
        party_addr: formData.event_address,
        invitation_id: localStorage.getItem('invitation_id'),
        created_by: sessionStorage.getItem('Id'),
      };
      this.tmApi.businessEventDetails(newData).subscribe(
        (response: any) => {
          this.apiStatus = response.code;
          if (this.apiStatus === 200) {
            this.snackBar.open('Successfully Added Event Details', 'Close', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'end',
            });
          } else {
            this.snackBar.open('Failed to Event Details', 'Close', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'end',
            });
          }
        },
        (error) => {
          if (error.error.errors.msg) {
            this.snackBar.open(error.error.errors.msg, 'Close', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'end',
            });
          } else if (error.error.errors.message) {
            this.snackBar.open(error.error.errors.message, 'Close', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'end',
            });
          }
        }
      );
    }
  }

  notesInvitation() {
    const newData = this.fifthFormGroup.value;
    const invitationData = {
      invitation_id: localStorage.getItem('invitation_id'),
      greeting_msg: newData.greeting,
      invitee_name: newData.inviter_name,
      invitee_name_1: newData.invitee_name1,
      invitee_name_2: newData.invitee_name2,
    };

    this.tmApi.businessAdditional(invitationData).subscribe(
      (response) => {
        this.apiStatus = response.code;
        if (this.apiStatus === 200) {
          this.snackBar.open('Successfully Added Additional Notes', 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'end',
          });
        } else {
          this.snackBar.open('Failed to Add Additional Notes', 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'end',
          });
        }
        const invitation_id = response.invitation_id;
        localStorage.setItem('invitation_id', invitation_id);
      },
      (error) => {
        this.snackBar.open('Failed to Add Additional Notes', 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'end',
        });
      }
    );
  }

  contactInvitation() {
    const newData = this.sixthFormGroup.value;
    const invitationData = {
      invitation_id: localStorage.getItem('invitation_id'),
      rsvp_addr: newData.address,
      mobile_no: newData.phone,
    };

    this.tmApi.businessContactInfo(invitationData).subscribe(
      (response) => {
        this.apiStatus = response.code;
        if (this.apiStatus === 200) {
          this.snackBar.open(
            'Successfully Added Contact Information',
            'Close',
            {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'end',
            }
          );
        } else {
          this.snackBar.open('Failed to Add Contact Information', 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'end',
          });
        }
        const invitation_id = response.invitation_id;
        localStorage.setItem('invitation_id', invitation_id);
      },
      (error) => {
        this.snackBar.open('Failed to Add Contact Information', 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'end',
        });
      }
    );
  }

  specificInvitation() {
    const newData = this.seventhFormGroup.value;
    const invitationData = {
      invitation_id: localStorage.getItem('invitation_id'),
      other_requests: newData.specific_info,
    };

    this.tmApi.businessSpecificInfo(invitationData).subscribe(
      (response) => {
        this.apiStatus = response.code;
        if (this.apiStatus === 200) {
          this.snackBar.open(
            'Successfully Added Specific Information',
            'Close',
            {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'end',
            }
          );
          this.router.navigate(['/submit-page']);
        } else {
          this.snackBar.open('Failed to Add Specific Information', 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'end',
          });
        }
      },
      (error) => {
        this.snackBar.open('Failed to Add Specific Information', 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'end',
        });
      }
    );
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files;
    console.log(this.selectedFile);
  }

  uploadImage(): void {
    if (this.selectedFile) {
      const formData = new FormData();

      for (let i = 0; i < this.selectedFile.length; i++) {
        formData.append('files[]', this.selectedFile[i]);
      }

      formData.append(
        'invitation_id',
        localStorage.getItem('invitation_id') || ''
      );

      this.tmApi.ritual_image_upload(formData).subscribe(
        (response: any) => {
          if (response.code === 200) {
            this.snackBar.open('Successfully Upload Image', 'Close', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'end',
            });
          } else {
            this.snackBar.open('Failed to Upload Image', 'Close', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'end',
            });
          }
        },
        (error) => {
          if (error.error.errors.msg) {
            this.snackBar.open(error.error.errors.msg, 'Close', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'end',
            });
          } else if (error.error.errors.message) {
            this.snackBar.open(error.error.errors.message, 'Close', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'end',
            });
          }
        }
      );
    }
  }
}
