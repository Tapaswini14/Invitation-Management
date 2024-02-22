import { Component } from '@angular/core';

@Component({
  selector: 'app-muslim-wedding-invitation',
  templateUrl: './muslim-wedding-invitation.component.html',
  styleUrls: ['./muslim-wedding-invitation.component.css'],
})
export class MuslimWeddingInvitationComponent {
  brideClick() {
    const brideId: any = 1;
    sessionStorage.setItem('brideId', brideId);
  }

  groomClick() {
    const groomId: any = 2;
    sessionStorage.setItem('groomId', groomId);
  }
}
