import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChristianBrideInvitationComponent } from './christian-bride-invitation.component';

describe('ChristianBrideInvitationComponent', () => {
  let component: ChristianBrideInvitationComponent;
  let fixture: ComponentFixture<ChristianBrideInvitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChristianBrideInvitationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChristianBrideInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
