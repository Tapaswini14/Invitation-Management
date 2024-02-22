import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TmApiService } from 'src/app/shared/tmApi.service';

@Component({
  selector: 'app-birthday-invitation',
  templateUrl: './birthday-invitation.component.html',
  styleUrls: ['./birthday-invitation.component.css'],
})
export class BirthdayInvitationComponent {
  minimumDate: any;
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
    celebrantNickName: ['', [(Validators.required, this.usernameValidator)]],
    birthdayDate: ['', Validators.required],
    celebrantName: ['', [Validators.required, this.usernameValidator]],
  });
  thirdFormGroup = this._formBuilder.group({});
  fourthFormGroup = this._formBuilder.group({
    mother_name: ['', [Validators.required, this.usernameValidator]],
    father_name: ['', [Validators.required, this.usernameValidator]],
    relation_with_Parents: ['', Validators.required],
  });
  fifthFormGroup = this._formBuilder.group({
    birthday_date: ['', Validators.required],
    birthday_time: ['', Validators.required],
    birthday_address: ['', Validators.required],
    party_type: ['', Validators.required],
    birthday_dress: ['', Validators.required],
  });
  sixthFormGroup = this._formBuilder.group({
    greeting: ['', [Validators.required, this.specialPatternValidator]],
    inviter_name: ['', Validators.required],
    invitee_name1: [''],
    invitee_name2: [''],
  });
  seventhFormGroup = this._formBuilder.group({
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
  eightFormGroup = this._formBuilder.group({
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

  isEigthFormValid(): boolean {
    return this.eightFormGroup.valid;
  }

  constructor(
    private _formBuilder: FormBuilder,
    private tmApi: TmApiService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    const currentDate = new Date();
    this.minimumDate = currentDate;
  }

  createInvitation() {
    const newData = this.firstFormGroup.value;
    const invitationData = {
      biller_name: newData.biller_name,
      ritual_id: localStorage.getItem('ritualId'),
    };

    this.tmApi.createbirthdayInvitation(invitationData).subscribe(
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

  birthdayDetails() {
    const newData = this.secondFormGroup.value;
    let dateInForm = this.secondFormGroup.value.birthdayDate;
    if (dateInForm) {
      let currentdate = new Date(dateInForm);
      let datetime =
        currentdate.getFullYear() +
        '-' +
        (currentdate.getMonth() + 1) +
        '-' +
        currentdate.getDate();
      const invitationData = {
        celebrant_name: newData.celebrantName,
        celebrant_nick_name: newData.celebrantNickName,
        birthday_date: datetime,
        invitation_id: localStorage.getItem('invitation_id'),
      };

      this.tmApi.addBirthdayDetails(invitationData).subscribe(
        (response) => {
          this.apiStatus = response.code;
          if (this.apiStatus === 200) {
            this.snackBar.open('Successfully Added Birthday Details', 'Close', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'end',
            });
          } else {
            this.snackBar.open('Failed to Add Birthday Details', 'Close', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'end',
            });
          }
        },
        (error) => {
          this.snackBar.open('Error Adding Birthday Details', 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'end',
          });
        }
      );
    }
  }

  parentDetails() {
    const newData = this.fourthFormGroup.value;
    const invitationData = {
      relation_with_parent: newData.relation_with_Parents,
      father_name: newData.father_name,
      mother_name: newData.mother_name,
      invitation_id: localStorage.getItem('invitation_id'),
    };

    this.tmApi.addParentDetails(invitationData).subscribe(
      (response) => {
        this.apiStatus = response.code;
        if (this.apiStatus === 200) {
          this.snackBar.open('Successfully Added Parent Details', 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'end',
          });
        } else {
          this.snackBar.open('Failed to Add Parent Details', 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'end',
          });
        }
      },
      (error) => {
        this.snackBar.open('Error Adding Parent Details', 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'end',
        });
      }
    );
  }

  notesInvitation() {
    const newData = this.sixthFormGroup.value;

    const invitationData = {
      invitation_id: localStorage.getItem('invitation_id'),
      greeting_msg: newData.greeting,
      invitee_name: newData.inviter_name,
      invitee_name_1: newData.invitee_name1,
      invitee_name_2: newData.invitee_name2,
    };

    this.tmApi.additionalNotes(invitationData).subscribe(
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
    const newData = this.seventhFormGroup.value;
    const invitationData = {
      invitation_id: localStorage.getItem('invitation_id'),
      rsvp_addr: newData.address,
      mobile_no: newData.phone,
    };

    this.tmApi.contactInfo(invitationData).subscribe(
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
    const newData = this.eightFormGroup.value;
    const invitationData = {
      invitation_id: localStorage.getItem('invitation_id'),
      other_requests: newData.specific_info,
    };

    this.tmApi.birthdaySpecificInfo(invitationData).subscribe(
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

  birthdayEventDetails() {
    const formData = this.fifthFormGroup.value;
    let dateInForm = this.fifthFormGroup.value.birthday_date;
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
        party_time: formData.birthday_time,
        party_addr: formData.birthday_address,
        reception_type: formData.party_type,
        dress_code: formData.birthday_dress,
        invitation_id: localStorage.getItem('invitation_id'),
        created_by: sessionStorage.getItem('Id'),
      };
      this.tmApi.eventDetails(newData).subscribe(
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

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files;
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
          this.apiStatus = response.code;
          if (this.apiStatus === 200) {
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
