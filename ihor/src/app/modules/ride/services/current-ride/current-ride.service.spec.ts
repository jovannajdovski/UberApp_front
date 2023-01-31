import { TestBed } from '@angular/core/testing';

import { CurrentRideService } from './current-ride.service';

describe('CurrentRideService', () => {
  let service: CurrentRideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentRideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
