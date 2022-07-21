import { TestBed } from '@angular/core/testing';

import { EtbService } from './etb.service';

describe('EtbService', () => {
  let service: EtbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EtbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
