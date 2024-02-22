import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChristianGroomInvitationComponent } from './christian-groom-invitation.component';

describe('ChristianGroomInvitationComponent', () => {
  let component: ChristianGroomInvitationComponent;
  let fixture: ComponentFixture<ChristianGroomInvitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChristianGroomInvitationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChristianGroomInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
