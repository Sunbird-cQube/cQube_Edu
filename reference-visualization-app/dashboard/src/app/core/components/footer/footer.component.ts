import { Component, OnInit } from '@angular/core';
import { DatasourceMetadataService } from '../../services/datasource-metadata-service/datasource-metadata.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  lastModified: Date;

  constructor(private readonly _dataSourceMetadataService: DatasourceMetadataService) {
    this._dataSourceMetadataService.metadata.subscribe(metadata => {
      if (metadata) {
        this.lastModified = metadata.lastModified;
      } else {
        this.lastModified = undefined;
      }
    })
  }

  ngOnInit(): void {
  }

}
