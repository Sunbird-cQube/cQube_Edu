import { Component, OnInit } from '@angular/core';
import { ETBService } from 'src/app/core/services/etb/etb.service';

@Component({
  selector: 'app-states-started-table',
  templateUrl: './states-started-table.component.html',
  styleUrls: ['./states-started-table.component.scss']
})
export class StatesStartedTableComponent implements OnInit {

  tableData: any;
  columns: any[] = [];

  constructor(private readonly _ETBService: ETBService) {
    this.getStateWiseQuizzesCoverageData();
   }

  ngOnInit(): void {
  }

  getStateWiseQuizzesCoverageData(){
    return this._ETBService.getStateWiseETBCoverageData().subscribe(res => {
      this.tableData = res.result.data;
      this.columns = res.result.columns;
    });
  }

}
