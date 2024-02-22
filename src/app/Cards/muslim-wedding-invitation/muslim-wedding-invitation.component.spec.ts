import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuslimWeddingInvitationComponent } from './muslim-wedding-invitation.component';

describe('MuslimWeddingInvitationComponent', () => {
  let component: MuslimWeddingInvitationComponent;
  let fixture: ComponentFixture<MuslimWeddingInvitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MuslimWeddingInvitationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MuslimWeddingInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
