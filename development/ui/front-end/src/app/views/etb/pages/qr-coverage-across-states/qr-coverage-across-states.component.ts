import { Component, OnInit } from '@angular/core';
import { ETBService } from 'src/app/core/services/etb/etb.service';

@Component({
  selector: 'app-qr-coverage-across-states',
  templateUrl: './qr-coverage-across-states.component.html',
  styleUrls: ['./qr-coverage-across-states.component.scss']
})
export class QRCoverageAcrossStatesComponent implements OnInit {
  tableData: any;
  columns: any[] = [];
  ETBProgramStatsByLocation: any;

  constructor(private readonly _ETBService: ETBService) {
    this.getETBProgramStatsByLocation();
    this.getStateWiseETBQRCoverageData();
  }

  ngOnInit(): void {
  }

  getETBProgramStatsByLocation(): void {
    this._ETBService.getETBProgramStatsByLocation().subscribe(ETBProgramStatsByLocationRes => {
      this.ETBProgramStatsByLocation = ETBProgramStatsByLocationRes.result;
    });
  }

  getStateWiseETBQRCoverageData(){
    return this._ETBService.getStateWiseETBQRCoverageData().subscribe(res => {
      this.tableData = res.result.data;
      this.columns = res.result.columns;
    });
  }

}
