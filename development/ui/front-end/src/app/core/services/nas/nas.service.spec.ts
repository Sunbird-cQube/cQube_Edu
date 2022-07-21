import { TestBed } from '@angular/core/testing';

import { NasService } from './nas.service';

describe('NasService', () => {
  let service: NasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
