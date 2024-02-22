import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadCeremonyComponent } from './thread-ceremony.component';

describe('ThreadCeremonyComponent', () => {
  let component: ThreadCeremonyComponent;
  let fixture: ComponentFixture<ThreadCeremonyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreadCeremonyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreadCeremonyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
