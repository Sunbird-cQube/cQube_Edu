import { Component, OnInit } from '@angular/core';
import { IReportDataPayload } from 'src/app/core/models/IReportDataPayload';
import { CommonService } from 'src/app/core/services/common/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-school-facilities-comparision',
  templateUrl: './school-facilities-comparision.component.html',
  styleUrls: ['./school-facilities-comparision.component.scss']
})
export class SchoolFacilitiesComparisionComponent implements OnInit {

  filters: any;
  levels: any;
  axisFilters: any
  options: Highcharts.Options | undefined;
  
  constructor(private readonly _commonService: CommonService) {
    this.getScatterData(this.filters, this.levels, this.axisFilters);
  }

  ngOnInit(): void {
  }

  getScatterData(filters: any, levels: any, axisFilters: any): void {
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'udise',
      reportName: 'udise_performance',
      reportType: 'scatterPlot',
      stateCode: environment.stateCode,
      filters,
      levels,
      axisFilters
    };

    this._commonService.getReportData(data).subscribe(res => {
      this.axisFilters = res.result.axisFilters;
      this.filters = res.result.filters;
      this.levels = res.result.levels;

      this.options = {
        xAxis: {
          max: 100,
          title: {
            text: this.getAxisTitle(this.axisFilters[0])
          }
        },
        yAxis: {
          max: 100,
          title: {
            text: this.getAxisTitle(this.axisFilters[1])
          }
        },
        tooltip: {
          formatter: function() {
            return (this.point as any).data;
          }
        },
        legend: {
          enabled: false
        },
        series: [{
          name: 'PM Poshan Access',
          type: 'scatter',
          color: 'rgba(223, 83, 83, .5)',
          data: res.result.data
        }]
      };
    });
  }

  getAxisTitle(axisFilter: any): string {
    if (axisFilter) {
      let filterOption = axisFilter.options.find((option: any) => option.value === axisFilter.value)
      if (filterOption) {
        return filterOption.label;
      }
    }

    return "";
  }

  scatterAxisFiltersUpdated(axisFilters: any): void {
    this.getScatterData(this.filters, this.levels, axisFilters);
  }
  
  scatterFiltersUpdated(filters: any): void {
    this.getScatterData(filters, this.levels, this.axisFilters);
  }

  onScatterSelectLevel(event: any): void {
    event.items.forEach((level: any, levelInd: number) => {
        level.selected = levelInd === event.index;
    });

    this.getScatterData(this.filters, event.items, this.axisFilters);
  }

}
