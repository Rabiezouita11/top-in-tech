import { TestBed } from '@angular/core/testing';

import { GeoLocalisationServiceService } from './geo-localisation-service.service';

describe('GeoLocalisationServiceService', () => {
  let service: GeoLocalisationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeoLocalisationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
