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

  state:any = 'IN';
  NASMetrics: any[] | undefined;
  NASProgramStatsByLocation: any
  NasStateData: any;
  filters: any;
  isMapReportLoading = true;
  levels: any;

  constructor(private readonly _commonService: CommonService, private readonly _configService: ConfigService, private readonly _spinner:NgxSpinnerService) {
    this.getNASMetrics()
    this.getNasData(this.filters, this.levels);
  }

  ngOnInit(): void {
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
      this.filters = res.result.filters;
      this.levels = res.result.levels;
      if(res.result.code != undefined){
        this.state = res.result.code;
      }

      // if(res.result.level == 'District' && Number(this.filters[3].value) > 0){
      //   this.selectedState = Number(this.filters[3].value);
      // }
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
