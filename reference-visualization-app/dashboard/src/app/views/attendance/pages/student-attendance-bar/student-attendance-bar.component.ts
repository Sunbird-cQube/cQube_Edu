import { Component, OnInit } from '@angular/core';
import { Axis } from 'highcharts';
import { getBarDatasetConfig, getChartJSConfig } from 'src/app/core/config/ChartjsConfig';
import { CommonService } from 'src/app/core/services/common/common.service';
import { WrapperService } from 'src/app/core/services/wrapper.service';
import { formatNumberForReport } from 'src/app/utilities/NumberFomatter';
import { buildQuery, parseTimeSeriesQuery } from 'src/app/utilities/QueryBuilder';
import { environment } from 'src/environments/environment';
import { config } from '../../config/attendance_config';

@Component({
  selector: 'app-student-attendance-bar',
  templateUrl: './student-attendance-bar.component.html',
  styleUrls: ['./student-attendance-bar.component.scss']
})
export class StudentAttendanceBarComponent implements OnInit {

  title: any;
  chartHeight: any;
  marginTop: any;
  config;
  data;
  fileName: string = "Student_Attendance_Bar";
  reportName: string = 'student_attendance_bar';
  filters: any = [];
  levels: any;
  tableReportData: any;
  startDate: any;
  endDate: any;
  minDate: any;
  maxDate: any;
  level = environment.config === 'national' ? 'state' : 'district';
  filterIndex: any;

  constructor(private readonly _commonService: CommonService, private readonly _wrapperService: WrapperService) { }

  ngOnInit(): void {
    this.getReportData();
  }

  async getReportData(): Promise<void> {
    let reportConfig = config

    let { timeSeriesQueries, queries, levels, defaultLevel, filters, options } = reportConfig[this.reportName];
    let onLoadQuery;

    this._wrapperService.constructFilters(this.filters, filters);

    Object.keys(queries).forEach((key: any) => {
      if (this.startDate !== undefined && this.endDate !== undefined && Object.keys(timeSeriesQueries).length > 0) {
        onLoadQuery = parseTimeSeriesQuery(timeSeriesQueries[key], this.startDate, this.endDate)
      }
      else {
        onLoadQuery = queries[key]
      }
      let query = buildQuery(onLoadQuery, defaultLevel, this.levels, this.filters, this.startDate, this.endDate, key);

      if (query && key === 'barChart') {
        this.getBarChartReportData(query, options);
      }


    })
  }

  getBarChartReportData(query, options): void {
    this._commonService.getReportDataNew(query).subscribe((res: any) => {
      let { rows } = res;
      let { barChart: { yAxis, xAxis } } = options;
      rows.forEach(row => {
        if (this.minDate !== undefined && this.maxDate !== undefined) {
          if (row['min_date'] < this.minDate) {
            this.minDate = row['min_date']
          }
          if (row['max_date'] > this.maxDate) {
            this.maxDate = row['max_date']
          }
        }
        else {
          this.minDate = row['min_date']
          this.maxDate = row['max_date']
        }
      });
      this.tableReportData = {
        values: rows
      }
      this.config = getChartJSConfig({
        labelExpr: yAxis.value,
        datasets: getBarDatasetConfig(xAxis?.metrics?.map((metric: any) => {
          return {
            dataExpr: metric.value, label: metric.label
          }
        })),
        options: {
          height: (rows.length * 15 + 150).toString(),
          tooltips: {
            callbacks: {
              label: (tooltipItem, data) => {
                let multistringText = [];  
                if (tooltipItem.datasetIndex === 0) {
                  xAxis.metrics.forEach((metric: any) => {
                    multistringText.push(`${metric.label}: ${formatNumberForReport(rows[tooltipItem.index][metric.value])}`);
                  });
                }

                return multistringText;
              }
            }
          },
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: yAxis.title
              }
            }],
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: xAxis.title
              }
            }]
          }
        }
      });
    });
  }

  filtersUpdated(filters: any): void {
    this.filters = filters;
    this.getReportData();
  }

  timeSeriesUpdated(event: any): void {
    this.startDate = event?.startDate?.toDate().toISOString().split('T')[0]
    this.endDate = event?.endDate?.toDate().toISOString().split('T')[0]
    this.getReportData();
  }

}
