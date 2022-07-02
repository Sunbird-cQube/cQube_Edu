import { Component, OnInit } from '@angular/core';
import { ETBService } from 'src/app/core/services/etb/etb.service';

@Component({
  selector: 'app-etb-coverage',
  templateUrl: './etb-coverage.component.html',
  styleUrls: ['./etb-coverage.component.scss']
})
export class EtbCoverageComponent implements OnInit {
  tableData: any;
  columns: any[] = [];

  constructor(private readonly _ETBService: ETBService) {
    this.getStateWiseETBCoverageData();
  }

  ngOnInit(): void {
  }

  getStateWiseETBCoverageData(){
    return this._ETBService.getStateWiseETBCoverageData().subscribe(res => {
      this.tableData = res.result.data;
      this.columns = res.result.columns;
    });
  }

}
