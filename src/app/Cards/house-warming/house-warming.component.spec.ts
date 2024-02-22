import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseWarmingComponent } from './house-warming.component';

describe('HouseWarmingComponent', () => {
  let component: HouseWarmingComponent;
  let fixture: ComponentFixture<HouseWarmingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseWarmingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseWarmingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
