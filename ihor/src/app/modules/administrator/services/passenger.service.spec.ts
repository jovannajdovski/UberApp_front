import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { PassengerService } from './passenger.service';

describe('PassengerService', () => {
  let service: PassengerService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule]
    });
    service = TestBed.inject(PassengerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
