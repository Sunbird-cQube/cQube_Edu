import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { IReportDataPayload } from 'src/app/core/models/IReportDataPayload';
import { CommonService } from 'src/app/core/services/common/common.service';
import { ETBService } from 'src/app/core/services/etb/etb.service';
import { NishthaService } from 'src/app/core/services/nishtha/nishtha.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pgi',
  templateUrl: './pgi.component.html',
  styleUrls: ['./pgi.component.scss']
})
export class PGIComponent implements OnInit {
  state: any= 'IN';
  filters: any;
  isMapReportLoading = true;

  pgiMetricsData: any;
  pgiStateData: any;
  pgiMetrics: any;
  tableData: any;
  columns: any[] = [];
  options: Highcharts.Options | undefined;

  constructor(private readonly _ETBService: ETBService, private readonly _configService: NishthaService,
    private readonly _commonService: CommonService, private readonly _spinner:NgxSpinnerService) {
    let data:any = "PGI";
    this._configService.getNishthaVanityMetrics(data).subscribe(dashboardMenuResult => {
      this.pgiMetricsData = dashboardMenuResult.result[3]?.metrics;
    });
    // this.getPGIMetricsData();
    this.getPGIStateData(this.filters);
    this.getStateWisePGICoverageData();
  }

  ngOnInit(): void {
  }

  onTabChanged($event: any): void {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
      console.log('resize');
    }, 100);
  }

  getStateWisePGICoverageData() {
    return this._ETBService.getStateWiseETBCoverageData().subscribe(res => {
      this.tableData = res.result.data;
      this.columns = res.result.columns;


      this.options = {
        title: {
          text: ""
        },
        yAxis: {
          title: {
            y: 60,
            text: 'Overall PGI Coverage'
          }
        },
        series: [{
          type: 'solidgauge',
          name: 'Speed',
          data: [60.6],
          innerRadius: '80%',
          dataLabels: {
            y: -20,
            format:
              '<div style="text-align:center">' +
              '<span style="font-size:25px">{y}%</span><br/>' +
              '</div>'
          },
          tooltip: {
            valueSuffix: ' %'
          }
        }]
      }
    });
  }

  getPGIMetricsData() {
    this.pgiMetricsData = [
      {
        "name": "States in Level I",
        "value": "0",
        "tooltip": "States in Level I- 0"
      },
      {
        "name": "States in Level II",
        "value": "5",
        "tooltip": "States in Level II"
      },
      {
        "name": "States in Grade I+",
        "value": "7",
        "tooltip": "States in Grade I+"
      },
      {
        "name": "States in Grade I",
        "value": "8",
        "tooltip": "States in Grade I"
      },
      {
        "name": "States in Grade II",
        "value": "8",
        "tooltip": "States in Grade II"
      },
      {
        "name": "States in Grade III",
        "value": "4",
        "tooltip": "States in Grade III"
      },
    ];
  }

  getPGIStateData(filters:any) {
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'pm_poshan',
      reportName: 'PM_poshan_access',
      reportType: 'map',
      stateCode: environment.stateCode,
      filters
    };

    this._commonService.getReportData(data).subscribe(res => {
      this._spinner.hide()
      this.isMapReportLoading = false;
      this.pgiStateData = res.result.data;
      this.filters = res.result.filters;
      if(res.result.code){
        this.state = res.result.code;
      }
    }, err => {
      this.isMapReportLoading = false;
    });
  }

  filtersUpdated(filters: any): void {
    this.getPGIStateData(filters);
  }

}
