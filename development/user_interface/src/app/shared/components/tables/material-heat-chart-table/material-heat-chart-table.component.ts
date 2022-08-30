import { AfterViewChecked, AfterViewInit, Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { TableHeatMapDirective } from 'src/app/shared/directives/table-heat-map/table-heat-map.directive';

@Component({
  selector: 'app-material-heat-chart-table',
  templateUrl: './material-heat-chart-table.component.html',
  styleUrls: ['./material-heat-chart-table.component.scss']
})
export class MaterialHeatChartTableComponent implements OnInit, OnChanges, AfterViewInit, AfterViewChecked {
  columnProperties: any[] = [];
  dataSource!: MatTableDataSource<any>;
  matSortActive = "";
  matSortDirection: SortDirection = "asc";
  columns: any;

  @Input() tableData: any;
  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(TableHeatMapDirective) tableHeatMap!: TableHeatMapDirective;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.constructTable();
  }

  ngOnChanges(): void {
    this.constructTable();
  }

  ngAfterViewChecked(): void {
      if (this.table) {
        this.table.updateStickyColumnStyles();
      }
  }

  constructTable(): void {
    if (this.tableData && this.sort) {
      setTimeout(() => {
        this.dataSource = new MatTableDataSource(this.tableData.data);
        this.sort.sortChange.subscribe(v=> console.log(v) );
        this.dataSource.sortingDataAccessor = (item, property) => {        
          switch(property) {
            default: return item[property].value;
          }
        };
        this.dataSource.sort = this.sort;
        let stickyColumns = [];

        this.columns = this.tableData.columns.map((column: any) => {
          if (window.innerWidth <= 480) {
            if (stickyColumns.length === 0) {
              stickyColumns.push(true);
              column.sticky = true;
            } else {
              column.sticky = false;
            }
          }

          return column;
        });
        //this.columnProperties = [...['id'], ...this.tableData.columns.map((column: any) => column.property)];
        this.columnProperties = this.tableData.columns.map((column: any) => column.property);
        this.matSortActive = this.tableData.sortByProperty;
        this.matSortDirection = this.tableData.sortDirection;  
      });    
    }
  }

  contentChanged(): void {
    if (this.tableHeatMap) {
      //this.tableHeatMap.colorTheTable();
    }
  }
}
