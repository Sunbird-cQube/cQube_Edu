import { Component, OnInit } from '@angular/core';
import { NasService } from 'src/app/core/services/nas/nas.service';
@Component({
  selector: 'app-nas-program',
  templateUrl: './nas-program.component.html',
  styleUrls: ['./nas-program.component.scss']
})
export class NasProgramComponent implements OnInit {
  tableData: any;
  columns: any[] = [];
  constructor(private readonly _NasService: NasService) {
    this.getStateWiseNasCoverageData()
  }

  ngOnInit(): void {
  }

  getStateWiseNasCoverageData() {
    return this._NasService.getNasStateData().subscribe((res:any) => {
      this.tableData = res.result.data;
      this.columns = res.result.columns;
    });
  }

}
