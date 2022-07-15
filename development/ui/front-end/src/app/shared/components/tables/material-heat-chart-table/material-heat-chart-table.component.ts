import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableHeatMapDirective } from 'src/app/shared/directives/table-heat-map/table-heat-map.directive';

@Component({
  selector: 'app-material-heat-chart-table',
  templateUrl: './material-heat-chart-table.component.html',
  styleUrls: ['./material-heat-chart-table.component.scss']
})
export class MaterialHeatChartTableComponent implements OnInit {
  _tableData: any;
  _columns: any;
  columnProperties: any[] = [];
  dataSource!: MatTableDataSource<any>;

  @Input() set tableData(tableData: any) {
    if (tableData) {
      this._tableData = tableData;
      this.dataSource = new MatTableDataSource(tableData);
      this.dataSource.sort = this.sort;
    }
  };

  get tableData(): any {
    return this._tableData;
  }

  @Input() set columns(columns: any) {
    if (columns) {
      this._columns = columns;
      this.columnProperties = [...['id'], ...columns.map((column: any) => column.property)];
    }
  };

  get columns(): any {
    return this._columns;
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(TableHeatMapDirective) tableHeatMap!: TableHeatMapDirective;

  constructor() { }

  ngOnInit(): void {
  }
}
