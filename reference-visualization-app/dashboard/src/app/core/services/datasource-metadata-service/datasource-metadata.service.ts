import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatasourceMetadataService {

  metadata = new BehaviorSubject<any>(undefined);

  constructor() { }

  updateMetaData(metadata: any) {
    this.metadata.next(metadata);
  }
}
