import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HinduBrideWeddingComponent } from './hindu-bride-wedding.component';

describe('HinduBrideWeddingComponent', () => {
  let component: HinduBrideWeddingComponent;
  let fixture: ComponentFixture<HinduBrideWeddingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HinduBrideWeddingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HinduBrideWeddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
