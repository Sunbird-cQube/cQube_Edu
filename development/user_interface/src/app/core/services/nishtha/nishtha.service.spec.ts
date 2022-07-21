import { TestBed } from '@angular/core/testing';

import { NishthaService } from './nishtha.service';

describe('NishthaService', () => {
  let service: NishthaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NishthaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
