import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuslimGroomWeddingComponent } from './muslim-groom-wedding.component';

describe('MuslimGroomWeddingComponent', () => {
  let component: MuslimGroomWeddingComponent;
  let fixture: ComponentFixture<MuslimGroomWeddingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MuslimGroomWeddingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MuslimGroomWeddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
