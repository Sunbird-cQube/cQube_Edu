import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { ETBService } from 'src/app/core/services/etb/etb.service';


@Component({
  selector: 'app-etb-program',
  templateUrl: './etb-program.component.html',
  styleUrls: ['./etb-program.component.scss']
})
export class EtbProgramComponent implements OnInit {

  @ViewChild('etbTbSort') empTbSort = new MatSort();

  tableData: any;
  displayedColumns: any[] = [];
  constructor(private etbService: ETBService) { }

  ngOnInit(): void {
    this.getStateWiseETBCoverageData()
  }

  getStateWiseETBCoverageData(){
    return this.etbService.getStateWiseETBCoverageData().subscribe(res => {
      this.tableData = res.result;
      this.tableData.sort = this.empTbSort;
      this.displayedColumns = Object.keys(this.tableData[0])
    })
  }
  
}
