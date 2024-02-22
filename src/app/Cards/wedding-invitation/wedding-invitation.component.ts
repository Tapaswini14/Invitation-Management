import { Component } from '@angular/core';

@Component({
  selector: 'app-wedding-invitation',
  templateUrl: './wedding-invitation.component.html',
  styleUrls: ['./wedding-invitation.component.css'],
})
export class WeddingInvitationComponent {
  brideClick() {
    const brideId: any = 1;
    sessionStorage.setItem('brideId', brideId);
  }

  groomClick() {
    const groomId: any = 2;
    sessionStorage.setItem('groomId', groomId);
  }
}
