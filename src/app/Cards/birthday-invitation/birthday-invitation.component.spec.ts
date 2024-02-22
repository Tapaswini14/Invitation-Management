import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthdayInvitationComponent } from './birthday-invitation.component';

describe('BirthdayInvitationComponent', () => {
  let component: BirthdayInvitationComponent;
  let fixture: ComponentFixture<BirthdayInvitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BirthdayInvitationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BirthdayInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
