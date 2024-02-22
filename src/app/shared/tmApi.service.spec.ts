import { TestBed } from '@angular/core/testing';

import { TmApiService } from './tmApi.service';

describe('TmApiService', () => {
  let service: TmApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TmApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
