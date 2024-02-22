import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessOpeningComponent } from './business-opening.component';

describe('BusinessOpeningComponent', () => {
  let component: BusinessOpeningComponent;
  let fixture: ComponentFixture<BusinessOpeningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessOpeningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessOpeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
