import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import data from 'src/assets/data/etb.json'
import * as XLSX from 'xlsx';
import {MatSort, Sort} from '@angular/material/sort';
export interface ETB {
  state:any
  totalEnrollments: any;
  totalCompletion: any;
  totalcertification: any;
  no:any
}
@Component({
  selector: 'app-etb-coverage',
  templateUrl: './etb-coverage.component.html',
  styleUrls: ['./etb-coverage.component.scss']
})
export class EtbCoverageComponent implements OnInit {

  @ViewChild('etbTbSort') empTbSort = new MatSort();
  @ViewChild('etbTbSortWithObject') etbTbSortWithObject = new MatSort();

  
  reportName='ETB Coverage across States'
  ELEMENT_DATA: ETB[] = data;
  displayedColumns = ['no','state', 'totalEnrollments', 'totalCompletion', 'totalcertification'];
  displayedColumnsWithObject :String[]= ['no','state', 'totalEnrollments', 'totalCompletion', 'totalcertification'];

  // dataSources: ETB[] = data;
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  dataSourceWithObjectColumn = new MatTableDataSource(this.ELEMENT_DATA);
  ngAfterViewInit() {
    
    this.empTbSort.disableClear = true;
    this.dataSource.sort = this.empTbSort;

    this.etbTbSortWithObject.disableClear = true;
    this.dataSourceWithObjectColumn.sort = this.etbTbSortWithObject;
    
  }

  exportToExcel(data:any) {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.ELEMENT_DATA);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.reportName + '.xlsx');
  }
  constructor() { }


  ngOnInit(): void {
  }

}
