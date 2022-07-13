import { Component, OnInit } from '@angular/core';
import { IStateWiseEnrollmentRec } from 'src/app/core/models/IStateWiseEnrollmentRec';

import { ETBService } from 'src/app/core/services/etb/etb.service';
import { NishthaService } from 'src/app/core/services/nishtha/nishtha.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-etb',
  templateUrl: './etb.component.html',
  styleUrls: ['./etb.component.scss']
})
export class EtbComponent implements OnInit {

  config: string = environment.config
  NVSK: boolean = true;

  ETBMetrics: any[] | undefined;
  ETBProgramStatsByLocation: any;

  stateWiseEnrollmentData!: IStateWiseEnrollmentRec[];
  options: Highcharts.Options | undefined;

  constructor(private readonly _ETBService: ETBService,private readonly _nishthaService: NishthaService) {
    let params: any = {
      "version": "1.0"
    }

    this._nishthaService.getNishthaVanityMetrics().subscribe(dashboardMenuResult => {
      this.ETBMetrics = dashboardMenuResult.result[1]?.metrics;
    });

    this.getETBMetrics();
    this.getETBProgramStatsByLocation();
    this._nishthaService.getStateWiseEnrollmentData(params['version']).subscribe(res => {
      this.options = {
        chart: {
          events: {
            load: function (this: any) {
              let categoryHeight = 20;
              this.update({
                chart: {
                  height: categoryHeight * this.pointCount + (this.chartHeight - this.plotHeight)
                }
              })
            }
          }
        },
        xAxis: {
          categories: res.result.map((record: IStateWiseEnrollmentRec) => {
            return record['State'];
          })
        },
        yAxis: {
          opposite: true
        },
        series: [{
          type: 'bar',
          name: 'Total Enrollments',
          data: res.result.map((record: IStateWiseEnrollmentRec) => record['Total Enrollments'])
        }, {
          type: 'bar',
          name: 'Total Certifications',
          data: res.result.map((record: IStateWiseEnrollmentRec) => record['Total Certifications'])
        }]
      };

      this.stateWiseEnrollmentData = res.result;
    });
  }

  ngOnInit(): void {
    if (this.config == 'VSK') {
      this.NVSK = false;
    }
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
