import { TestBed } from '@angular/core/testing';

import { PassengerStatisticsService } from './passenger-statistics.service';

describe('PassengerStatisticsService', () => {
  let service: PassengerStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassengerStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
