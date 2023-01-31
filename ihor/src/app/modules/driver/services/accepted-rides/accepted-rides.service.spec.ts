import { TestBed } from '@angular/core/testing';

import { AcceptedRidesService } from './accepted-rides.service';

describe('AcceptedRidesService', () => {
  let service: AcceptedRidesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcceptedRidesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
