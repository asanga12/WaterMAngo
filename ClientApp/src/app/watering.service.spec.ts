import { TestBed } from '@angular/core/testing';

import { WateringService } from './watering.service';

describe('WateringService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WateringService = TestBed.get(WateringService);
    expect(service).toBeTruthy();
  });
});
