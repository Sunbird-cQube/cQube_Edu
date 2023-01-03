import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonService } from 'src/app/core/services/common/common.service';
import { WrapperService } from 'src/app/core/services/wrapper.service';
import { buildQuery, parseTimeSeriesQuery } from 'src/app/utilities/QueryBuilder';
import { environment } from 'src/environments/environment';
import { config } from '../../config/attendance_config'

@Component({
  selector: 'app-student-attendance-new',
  templateUrl: './student-attendance-new.component.html',
  styleUrls: ['./student-attendance-new.component.scss']
})
export class StudentAttendanceNewComponent implements OnInit {
  reportName: string = 'student_attendance_complaince';
  filters: any = [];
  levels: any;
  tableReportData: any;
  bigNumberReportData: any = {
    reportName: "Student Attendance Complaince"
  };
  startDate: any;
  endDate: any;
  minDate: any;
  maxDate: any;
  compareDateRange: any = 30;
  level = environment.config === 'national' ? 'state' : 'district';
  filterIndex: any;

  @Output() bigNumberReport = new EventEmitter<any>();

  constructor(private readonly _commonService: CommonService, private readonly _wrapperService: WrapperService) { }

  ngOnInit(): void {
    this.getReportData();
  }
  // select t1.district_id, district_name, sum(count), sum(sum), avg(percentage) from ingestion.student_attendance_by_district as t1 left join ingestion.student_attendance as t2 on t1.district_id = t2.district_id where date between '2022-12-15' and '2022-12-18' group by t1.district_id,district_name;
  // select t1.district_id, district_name, sum(count), sum(sum), avg(percentage) from ingestion.student_attendance_by_district as t1 left join ingestion.student_attendance as t2 on t1.district_id = t2.district_id group by t1.district_id,district_name;

  // "query": "select min(date) as min_date, max(date) as max_date, state_name, avg(percentage) as percentage from ingestion.student_attendance_by_state as t1 left join ingestion.student_attendance as t2 on t1.state_id = t2.state_id group by t1.state_id, state_name",

  // select cluster_name, round(avg((sum/count)* 100.00),2) as percentage from ingestion.student_attendance_marked_above_50_percent_by_cluster as t1 left join ingestion.student_attendance as t2 on t1.cluster_id=t2.cluster_id where t1.cluster_id = '1010304' group by t1.cluster_id, cluster_name;
  async getReportData(): Promise<void> {
    let reportConfig = config

    let { timeSeriesQueries, queries, levels, filters, options } = reportConfig[this.reportName];
    let onLoadQuery;

    this._wrapperService.constructFilters(this.filters, filters);

    Object.keys(queries).forEach((key: any) => {
      if (key.toLowerCase().includes('comparison')) {
        let endDate = new Date();
        let days = endDate.getDate() - this.compareDateRange;
        let startDate = new Date();
        startDate.setDate(days)
        console.log(startDate.toISOString().split('T')[0], ' - ', endDate.toISOString().split('T')[0])
        onLoadQuery = parseTimeSeriesQuery(timeSeriesQueries[key], startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0])
      }
      else if (this.startDate !== undefined && this.endDate !== undefined && Object.keys(timeSeriesQueries).length > 0) {
        onLoadQuery = parseTimeSeriesQuery(timeSeriesQueries[key], this.startDate, this.endDate)
      }
      else {
        onLoadQuery = queries[key]
      }
      let query = buildQuery(onLoadQuery, this.levels, this.filters, this.startDate, this.endDate, this.compareDateRange, key);

      if (key === 'table') {
        this.getTableReportData(query, options);
      }
      else if (key === 'bigNumber') {
        this.getBigNumberReportData(query, options, 'averagePercentage');
      }
      else if (key === 'bigNumberComparison') {
        this.getBigNumberReportData(query, options, 'differencePercentage')
      }


    })
  }

  filtersUpdated(filters: any): void {
    this.filters = filters;
    this.getReportData();
  }

  onSelectLevel(event: any): void {
    this.levels = event.items;
    this.getReportData();
  }

  timeSeriesUpdated(event: any): void {
    this.startDate = event?.startDate?.toDate().toISOString().split('T')[0]
    this.endDate = event?.endDate?.toDate().toISOString().split('T')[0]
    this.getReportData();
  }

  getTableReportData(query, options): void {
    this._commonService.getReportDataNew(query).subscribe((res: any) => {
      let { rows } = res;
      // let { map: { indicator, indicatorType, legend, latitude, longitude }, tooltip } = options;
      let { table: { columns }, tooltip } = options;
      // this.reportData = {
      //   data: rows.map(row => {
      //     row = {
      //       ...row,
      //       Latitude: row[latitude],
      //       Longitude: row[longitude],
      //       indicator: row[indicator],
      //       tooltip: this._wrapperService.formatToolTip(tooltip, row)
      //     };         

      //     return row;
      //   }),
      //   options: {
      //     reportIndicatorType: indicatorType,
      //     legend
      //   }
      // }
      this.tableReportData = {
        data: rows.map(row => {
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
          columns.forEach((col: any) => {
            if (row[col.property]) {
              row = {
                ...row,
                [col.property]: { value: row[col.property] }
              }
            }
          });
          return row
        }),
        columns: columns.filter(col => {
          if (rows[0] && col.property in rows[0]) {
            return col;
          }
        })
      }
    });
  }

  async getBigNumberReportData(query: string, options: any, indicator: string): Promise<void> {
    let { bigNumber } = options ?? {};
    let { valueSuffix } = bigNumber ?? {};
    if (indicator === 'averagePercentage') {
      this.bigNumberReportData = {
        ...this.bigNumberReportData,
        valueSuffix: valueSuffix
      }
      await this._commonService.getReportDataNew(query).subscribe((res: any) => {
        if (res) {
          let { rows } = res;
          this.bigNumberReportData = {
            ...this.bigNumberReportData,
            averagePercentage: rows[0].percentage
          }
        }
      })
    }
    else if (indicator === 'differencePercentage') {
      await this._commonService.getReportDataNew(query).subscribe((res: any) => {
        if (res) {
          let { rows } = res;
          this.bigNumberReportData = {
            ...this.bigNumberReportData,
            differencePercentage: rows[0].percentage
          }
          // this.bigNumberReport.emit(this.bigNumberReportData)
        }
        console.log(this.bigNumberReportData)
      })
    }
    // console.log(rows)
  }

  getMapReportaData(query, options): void {

  }
}
