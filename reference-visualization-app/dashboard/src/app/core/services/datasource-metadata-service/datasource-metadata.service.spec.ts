import { TestBed } from '@angular/core/testing';

import { DatasourceMetadataService } from './datasource-metadata.service';

describe('DatasourceMetadataService', () => {
  let service: DatasourceMetadataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatasourceMetadataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
