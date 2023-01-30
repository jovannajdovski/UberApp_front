import { TestBed } from '@angular/core/testing';

import { GlobalStatisticsService } from './global-statistics.service';

describe('GlobalStatisticsService', () => {
  let service: GlobalStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
