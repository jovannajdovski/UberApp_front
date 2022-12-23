import { TestBed } from '@angular/core/testing';

import { RideRejectionService } from './ride-rejection.service';

describe('RideRejectionService', () => {
  let service: RideRejectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RideRejectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
