import { TestBed } from '@angular/core/testing';

import { NextRideService } from './next-ride.service';

describe('NextRideService', () => {
  let service: NextRideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NextRideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
