import { Component } from '@angular/core';

@Component({
  selector: 'app-christian-wedding-invitation',
  templateUrl: './christian-wedding-invitation.component.html',
  styleUrls: ['./christian-wedding-invitation.component.css'],
})
export class ChristianWeddingInvitationComponent {
  brideClick() {
    const brideId: any = 1;
    sessionStorage.setItem('brideId', brideId);
  }

  groomClick() {
    const groomId: any = 2;
    sessionStorage.setItem('groomId', groomId);
  }
}
