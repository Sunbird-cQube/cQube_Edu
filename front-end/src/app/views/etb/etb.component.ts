import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';

import { ETBService } from 'src/app/core/services/etb/etb.service';

@Component({
  selector: 'app-etb',
  templateUrl: './etb.component.html',
  styleUrls: ['./etb.component.scss']
})
export class EtbComponent implements OnInit {
  ETBMetrics: any[] | undefined;

  @ViewChild('etbTbSort') empTbSort = new MatSort();

  tableData: any;
  columnProperties: any[] = [];
  displayedColumns: any[] = [];
  columns: any[] = [];

  constructor(private readonly _ETBService: ETBService) {
    this._ETBService.getETBMetrics().subscribe(ETBMetricsRes => {
      this.ETBMetrics = ETBMetricsRes.result;
    });
  }

  ngOnInit(): void {
    this.getStateWiseETBCoverageData()
  }

  getStateWiseETBCoverageData(){
    return this._ETBService.getStateWiseETBCoverageData().subscribe(res => {
      this.tableData = res.result.data;
      this.tableData.sort = this.empTbSort;
      this.columnProperties = res.result.columns.map((column: any) => column.property);
      this.displayedColumns = res.result.columns.map((column: any) => column.name);
      this.columns = res.result.columns;
    });
  }
  
}
