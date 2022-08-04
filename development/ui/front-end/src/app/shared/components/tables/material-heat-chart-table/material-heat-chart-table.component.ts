import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableHeatMapDirective } from 'src/app/shared/directives/table-heat-map/table-heat-map.directive';

@Component({
  selector: 'app-material-heat-chart-table',
  templateUrl: './material-heat-chart-table.component.html',
  styleUrls: ['./material-heat-chart-table.component.scss']
})
export class MaterialHeatChartTableComponent implements OnInit, OnChanges {
  columnProperties: any[] = [];
  dataSource!: MatTableDataSource<any>;
  matSortActive = "";
  matSortDirection: SortDirection = "asc";
  columns: any;

  @Input() tableData: any;
  @Input() stickyColumns: Number = 1;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(TableHeatMapDirective) tableHeatMap!: TableHeatMapDirective;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.tableData) {
      this.dataSource = new MatTableDataSource(this.tableData.data);
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch(property) {
          default: return item[property].value;
        }
      };
      this.dataSource.sort = this.sort;
      this.columns = this.tableData.columns;
      //this.columnProperties = [...['id'], ...this.tableData.columns.map((column: any) => column.property)];
      this.columnProperties = this.tableData.columns.map((column: any) => column.property);
      this.matSortActive = this.tableData.sortByProperty;
      this.matSortDirection = this.tableData.sortDirection;
    }
  }

  contentChanged(): void {
    if (this.tableHeatMap) {
      this.tableHeatMap.colorTheTable();
    }
  }
}
