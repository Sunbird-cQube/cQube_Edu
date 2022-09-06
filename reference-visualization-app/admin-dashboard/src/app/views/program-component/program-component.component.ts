import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/core/services/common/common.service';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-program-component',
  templateUrl: './program-component.component.html',
  styleUrls: ['./program-component.component.scss']
})
export class ProgramComponentComponent implements OnInit {
  config: string = environment.config;
  filters: any;
  national: boolean = true;
  isMapReportLoading = true;
  NCFMetrics: any[] | undefined;
  ncfProgressData: any;
  metricFilter: any;
  tabNames: any;
  program: any;
  reportsData: any;

  constructor(private readonly _commonService: CommonService, private readonly _spinner: NgxSpinnerService, private readonly _configService: ConfigService,
              private readonly route: ActivatedRoute
    ) {
    // this._configService.getVanityMetrics('ncf').subscribe(vanityMetricsRes => {
    //   this.NCFMetrics = vanityMetricsRes.result;
    // });
    // this.getNcfProgressData1(this.filters, this.metricFilter)
    // this.getNcfProgressData(this.filters, this.metricFilter);
  }

  ngOnInit(): void {
    this.route.params.subscribe((parameter: any) => {
      // console.log(parameter.id)
      this.getReportData1(this.filters, this.metricFilter, parameter.program);
    })
  }


  getReportData1(filters: any, metricFilter: any, program: any): void {
    let data: any = {
      appName: environment.config.toLowerCase(),
      stateCode: environment.stateCode,
      filters,
      metricFilter,
      program
    };

    this._commonService.getReportData1(data).subscribe(res => {
      this._spinner.hide()
      this.reportsData = res.result;
      this.tabNames = Object.keys(this.reportsData);
      // this.isMapReportLoading = false;
      // this.ncfProgressData = res.result;
      // this.filters = res.result.filters;
      // this.metricFilter = res.result.metricFilter;
    }, err => {
      this.isMapReportLoading = false;
    });
  }

  getNcfProgressData1(filters: any, metricFilter: any): void {
    let data: any = {
      appName: environment.config.toLowerCase(),

      stateCode: environment.stateCode,
      filters,
      metricFilter
    };

    this._commonService.getReportData1(data).subscribe(res => {
      this._spinner.hide()

      let result:any = res
      console.log('res', res)

        this.tabNames = result["section_name"]

      // this.isMapReportLoading = false;
      // this.ncfProgressData = res.result;
      // this.filters = res.result.filters;
      // this.metricFilter = res.result.metricFilter;
    }, err => {
      this.isMapReportLoading = false;
    });
  }

  onTabChanged($event: any): void {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  }

  filtersUpdated(filters: any): void {
    // this.getNcfProgressData(filters, this.metricFilter);
  }

  onSelectMetricFilter(metricFilter: any): void {
    // this.getNcfProgressData(this.filters, metricFilter);
  }
}
