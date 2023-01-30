import { TestBed } from '@angular/core/testing';

import { DriverStatisticsService } from './driver-statistics.service';

describe('DriverStatisticsService', () => {
  let service: DriverStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriverStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
