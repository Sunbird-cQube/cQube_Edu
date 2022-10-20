import { TestBed } from '@angular/core/testing';

import { MetadataInterceptorService } from './metadata-interceptor.service';

describe('MetadataInterceptorService', () => {
  let service: MetadataInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetadataInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
