import { Component, OnInit } from '@angular/core';

import { ETBService } from 'src/app/core/services/etb/etb.service';

@Component({
  selector: 'app-etb',
  templateUrl: './etb.component.html',
  styleUrls: ['./etb.component.scss']
})
export class EtbComponent implements OnInit {
  ETBMetrics: any[] | undefined;
  ETBProgramStatsByLocation: any;

  constructor(private readonly _ETBService: ETBService) {
    this.getETBMetrics();
    this.getETBProgramStatsByLocation();
  }

  ngOnInit(): void {
  }

  getETBMetrics(): void {
    this._ETBService.getETBMetrics().subscribe(ETBMetricsRes => {
      this.ETBMetrics = ETBMetricsRes.result;
    });
  }
  
  getETBProgramStatsByLocation(): void {
    this._ETBService.getETBProgramStatsByLocation().subscribe(ETBProgramStatsByLocationRes => {
      this.ETBProgramStatsByLocation = ETBProgramStatsByLocationRes.result;
    });
  }

  onTabChanged($event: any): void {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  }

}
