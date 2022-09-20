import { TestBed } from '@angular/core/testing';

import { SchoolInfraService } from './school-infra.service';

describe('SchoolInfraService', () => {
  let service: SchoolInfraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchoolInfraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
