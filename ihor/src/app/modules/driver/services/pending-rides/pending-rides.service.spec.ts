import { TestBed } from '@angular/core/testing';

import { PendingRidesService } from './pending-rides.service';

describe('PendingRidesService', () => {
  let service: PendingRidesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PendingRidesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
