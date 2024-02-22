import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChristianWeddingInvitationComponent } from './christian-wedding-invitation.component';

describe('ChristianWeddingInvitationComponent', () => {
  let component: ChristianWeddingInvitationComponent;
  let fixture: ComponentFixture<ChristianWeddingInvitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChristianWeddingInvitationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChristianWeddingInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
