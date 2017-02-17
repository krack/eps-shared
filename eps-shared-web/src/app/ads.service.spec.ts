import { TestBed, inject } from '@angular/core/testing';
import { AdsService } from './ads.service';

describe('AdsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdsService]
    });
  });

  it('should ...', inject([AdsService], (service: AdsService) => {
    expect(service).toBeTruthy();
  }));
});
