import { Component, OnInit } from '@angular/core';
import { IReportDataPayload } from 'src/app/core/models/IReportDataPayload';
import { CommonService } from 'src/app/core/services/common/common.service';
import { NasService } from 'src/app/core/services/nas/nas.service';
import { NishthaService } from 'src/app/core/services/nishtha/nishtha.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfigService } from 'src/app/core/services/config/config.service';

@Component({
  selector: 'app-student-learning-survey',
  templateUrl: './student-learning-survey.component.html',
  styleUrls: ['./student-learning-survey.component.scss']
})
export class StudentLearningSurveyComponent implements OnInit {
  noData: boolean = true;
  performanceLabel: string = 'State Wise Performance'
  level: string = 'state';
  NASMetrics: any[] | undefined;
  NASProgramStatsByLocation: any
  NasStateData: any;
  filters: any;
  isMapReportLoading = true;
  levels: any;
  NVSK: boolean = true;

  constructor(private readonly _commonService: CommonService, private readonly _configService: ConfigService, private readonly _spinner:NgxSpinnerService) {
    this.getNASMetrics()
    this.getNasData(this.filters, this.levels);
  }

  ngOnInit(): void {
    if(environment.config === 'VSK'){
      this.performanceLabel = 'District Wise Performance';
      this.NVSK = false;
    }
    this._spinner.show();
  }

  getNASMetrics(): void {
    this._configService.getVanityMetrics('nas').subscribe(vanityMetricsRes => {
      this.NASMetrics = vanityMetricsRes.result;
    });
  }

  getNasData(filters: any, levels: any): void {
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'nas',
      reportName: 'studentPerformance',
      reportType: 'map',
      stateCode: environment.stateCode,
      filters,
      levels
    };

    this._commonService.getReportData(data).subscribe(res => {
      this._spinner.hide()
      this.isMapReportLoading = false;
      this.NasStateData = res.result;
      this.noData = this.NasStateData.data ? false : true;
      this.filters = res.result.filters;
      this.levels = res.result.levels;
      this.levels.forEach((level:any) => {
        this.level = level.selected ? level.value : 'state'
      });
    }, error => {
      this.isMapReportLoading = false;
    });
  }


  onTabChanged($event: any): void {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  }

  filtersUpdated(filters: any): void {
    this.getNasData(filters, this.levels);
  }

  onSelectLevel(event: any): void {
    event.items.forEach((level: any, levelInd: number) => {
        level.selected = levelInd === event.index;
    });

    this.getNasData(this.filters, event.items);
  }

}
