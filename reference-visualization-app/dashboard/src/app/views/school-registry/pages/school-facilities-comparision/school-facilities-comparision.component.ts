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
  national: boolean = environment.config === 'national' ? true : false;
  filters: any;
  levels: any;
  axisFilters: any
  options: Highcharts.Options | undefined;
  config;
  dashletData;
  chartData = [];
  constructor(private readonly _commonService: CommonService) {
    this.getScatterData(this.filters, this.levels, this.axisFilters);
  }
  height = window.innerHeight;
  onResize() {
    this.height = window.innerHeight;
    if (this.chartData.length !== 0) {
      this.getScatterData(this.filters, this.levels, this.axisFilters);
    }
  }
  ngOnInit(): void {
  }

  getScatterData(filters: any, levels: any, axisFilters: any): void {

    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'school_registry',
      reportName: 'udise_performance',
      reportType: 'scatterPlot',
      stateCode: environment.stateCode,
      filters,
      levels,
      axisFilters
    };

    this.chartData = [];

    this._commonService.getReportData(data).subscribe(res => {
      this.axisFilters = res.result.axisFilters;
      this.filters = res.result.filters;
      this.levels = res.result.levels;
      
      if (res.status === 200) {
        this.chartData = res.result.data;

        this.dashletData = {
          values: res.result.data
        };

        this.config = {
          labelExpr: 'pm_poshan_access',
          datasets: [{
            label: 'PM Poshan Access',
            data: res.result.data,
            color: 'rgba(223, 83, 83, .5)',
            pointBorderWidth: 0.5,
            pointRadius: this.height > 1760 ? 16 : this.height > 1160 && this.height < 1760 ? 10 : this.height > 667 && this.height < 1160 ? 8 : 5,
            pointHoverRadius: this.height > 1760 ? 18 : this.height > 1160 && this.height < 1760 ? 12 : this.height > 667 && this.height < 1160 ? 9 : 6,
          }],
          options: {
            height: (res.result.data.length * 5 + 150).toString(),
            legend: {
              display: false
            },
            scales: {
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: this.getAxisTitle(this.axisFilters[1])
                },
                ticks: {
                  min: 0,
                  max: 100
                }
              }],
              xAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: this.getAxisTitle(this.axisFilters[0])
                },
                ticks: {
                  min: 0,
                  max: 100
                }
              }]
            },
            tooltips: {
              displayColors: false,
              mode: 'index',
              custom: function (tooltip) {
                if (!tooltip) return;
                // disable displaying the color box;
                tooltip.displayColors = false;
              },
              callbacks: {
                label: function (tooltipItem, data) {
                  let tooltipData = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].data;
                  var multistringText = [];
                  if (tooltipData) {
                    const tooltipDataSplit = tooltipData.split('<br>');

                    for (const toolTipSplitItem of tooltipDataSplit) {
                      multistringText.push(toolTipSplitItem);
                    }
                  }
                  return multistringText;
                },
              }
            }
          }
        };
      } else {
        this.chartData = [];
      }


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
          formatter: function () {
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
