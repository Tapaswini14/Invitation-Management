import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TmApiService } from 'src/app/shared/tmApi.service';

@Component({
  selector: 'app-christian-groom-invitation',
  templateUrl: './christian-groom-invitation.component.html',
  styleUrls: ['./christian-groom-invitation.component.css'],
})
export class ChristianGroomInvitationComponent {
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
    groom_name: ['', [Validators.required, this.usernameValidator]],
    groom_nick_name: ['', [Validators.required, this.usernameValidator]],
    relation_with_Parents: ['', Validators.required],
    father_name: ['', [Validators.required, this.usernameValidator]],
    mother_name: ['', [Validators.required, this.usernameValidator]],
    groom_address: [
      '',
      [
        Validators.required,
        this.usernameValidator,
        this.specialPatternValidator,
      ],
    ],
  });
  thirdFormGroup = this._formBuilder.group({
    bride_name: ['', [Validators.required, this.usernameValidator]],
    bride_nick_name: ['', [Validators.required, this.usernameValidator]],
    relation_with_Parents: ['', Validators.required],
    father_name: ['', [Validators.required, this.usernameValidator]],
    mother_name: ['', [Validators.required, this.usernameValidator]],
    bride_address: [
      '',
      [
        Validators.required,
        this.usernameValidator,
        this.specialPatternValidator,
      ],
    ],
  });
  fourthFormGroup = this._formBuilder.group({});
  fifthFormGroup = this._formBuilder.group({
    bible_date: ['', Validators.required],
    wedding_date: ['', Validators.required],
    reception_date: ['', Validators.required],
    bible_time: ['', Validators.required],
    wedding_time: ['', Validators.required],
    reception_time: ['', Validators.required],
    bible_venue: ['', Validators.required],
    wedding_venue: ['', Validators.required],
    reception_venue: ['', Validators.required],
    reception_type: ['', Validators.required],
  });
  sixthFormGroup = this._formBuilder.group({
    greeting: ['', [Validators.required, this.specialPatternValidator]],
    inviter_name: ['', Validators.required],
    invitee_name1: [''],
    invitee_name2: [''],
    date: ['', Validators.required],
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
  eigthFormGroup = this._formBuilder.group({
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
    return this.fifthFormGroup.valid;
  }

  isFifthFormValid(): boolean {
    return this.sixthFormGroup.valid;
  }

  isSixthFormValid(): boolean {
    return this.seventhFormGroup.valid;
  }

  isSeventhFormValid(): boolean {
    return this.eigthFormGroup.valid;
  }

  constructor(
    private _formBuilder: FormBuilder,
    private tmApi: TmApiService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
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

  createInvitation() {
    const newData = this.firstFormGroup.value;
    const invitationData = {
      biller_name: newData.biller_name,
      ritual_id: localStorage.getItem('ritualId'),
    };

    this.tmApi.createWeddingInvitation(invitationData).subscribe(
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

  submitBrideDetails() {
    const newData = this.thirdFormGroup.value;
    const invitationData = {
      bride_name: newData.bride_name,
      bride_nick_name: newData.bride_nick_name,
      relation_with_parent: newData.relation_with_Parents,
      father_name: newData.father_name,
      mother_name: newData.mother_name,
      bride_address: newData.bride_address,
      invitation_id: localStorage.getItem('invitation_id'),
    };

    this.tmApi.createBrideDetails(invitationData).subscribe(
      (response) => {
        this.apiStatus = response.code;
        if (this.apiStatus === 200) {
          this.snackBar.open('Successfully Created Bride Details', 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'end',
          });
        } else {
          this.snackBar.open('Failed to Create Bride Details', 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'end',
          });
        }
      },
      (error) => {
        this.snackBar.open('Failed to Create Bride Details', 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'end',
        });
      }
    );
  }

  submitGroomDetails() {
    const newData = this.secondFormGroup.value;
    const invitationData = {
      groom_name: newData.groom_name,
      groom_nick_name: newData.groom_nick_name,
      relation_with_parent: newData.relation_with_Parents,
      father_name: newData.father_name,
      mother_name: newData.mother_name,
      groom_address: newData.groom_address,
      invitation_id: localStorage.getItem('invitation_id'),
    };

    this.tmApi.createGroomDetails(invitationData).subscribe(
      (response) => {
        this.apiStatus = response.code;
        if (this.apiStatus === 200) {
          this.snackBar.open('Successfully Created Groom Details', 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'end',
          });
        } else {
          this.snackBar.open('Failed to Create Groom Details', 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'end',
          });
        }
      },
      (error) => {
        this.snackBar.open('Failed to Create Groom Details', 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'end',
        });
      }
    );
  }

  weddingInvitationdetails() {
    const newData = this.fifthFormGroup.value;
    const invitationData = {
      bible_verse_date: newData.bible_date,
      marriage_date: newData.wedding_date,
      reception_date: newData.reception_date,
      bible_verse_time: newData.bible_time,
      wedding_time: newData.wedding_time,
      reception_time: newData.reception_time,
      bible_verse_venue: newData.bible_venue,
      wedding_venue: newData.wedding_venue,
      reception_addr: newData.reception_venue,
      reception_type: newData.reception_type,
      invitation_id: localStorage.getItem('invitation_id'),
    };

    this.tmApi.createWeddingDetails(invitationData).subscribe(
      (response) => {
        this.apiStatus = response.code;
        if (this.apiStatus === 200) {
          this.snackBar.open(
            'Successfully Added Wedding Function Details',
            'Close',
            {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'end',
            }
          );
        } else {
          this.snackBar.open(
            'Failed to Add Wedding Function Details',
            'Close',
            {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'end',
            }
          );
        }
      },
      (error) => {
        this.snackBar.open('Error Adding Wedding Function Details', 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'end',
        });
      }
    );
  }

  notesInvitation() {
    const newData = this.sixthFormGroup.value;
    let dateInForm = this.sixthFormGroup.value.date;
    if (dateInForm) {
      let currentdate = new Date(dateInForm);
      let datetime =
        currentdate.getFullYear() +
        '-' +
        (currentdate.getMonth() + 1) +
        '-' +
        currentdate.getDate();

      const invitationData = {
        invitation_id: localStorage.getItem('invitation_id'),
        greeting_msg: newData.greeting,
        invitee_name: newData.inviter_name,
        invitee_name_1: newData.invitee_name1,
        invitee_name_2: newData.invitee_name2,
        marriage_date: datetime,
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
    const newData = this.eigthFormGroup.value;
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
}
