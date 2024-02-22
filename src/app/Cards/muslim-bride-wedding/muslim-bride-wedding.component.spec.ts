import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuslimBrideWeddingComponent } from './muslim-bride-wedding.component';

describe('MuslimBrideWeddingComponent', () => {
  let component: MuslimBrideWeddingComponent;
  let fixture: ComponentFixture<MuslimBrideWeddingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MuslimBrideWeddingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MuslimBrideWeddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
