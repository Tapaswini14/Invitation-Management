import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HinduGroomWeddingComponent } from './hindu-groom-wedding.component';

describe('HinduGroomWeddingComponent', () => {
  let component: HinduGroomWeddingComponent;
  let fixture: ComponentFixture<HinduGroomWeddingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HinduGroomWeddingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HinduGroomWeddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
