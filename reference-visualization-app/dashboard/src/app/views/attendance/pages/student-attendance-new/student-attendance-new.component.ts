import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/services/common/common.service';
import { WrapperService } from 'src/app/core/services/wrapper.service';
import { buildQuery } from 'src/app/utilities/QueryBuilder';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-student-attendance-new',
  templateUrl: './student-attendance-new.component.html',
  styleUrls: ['./student-attendance-new.component.scss']
})
export class StudentAttendanceNewComponent implements OnInit {
  filters: any = [];
  levels: any;
  reportData: any;
  level = environment.config === 'national' ? 'state': 'district';

  constructor(private readonly _commonService: CommonService, private readonly _wrapperService: WrapperService) { }

  ngOnInit(): void {
    this.getReportData();
  }

  async getReportData(): Promise<void> {
    let config = {
      "query": "select * from student_attendance_district",
      "filters": [
        {
          "name": "District",
          "labelProp": "district_name",
          "valueProp": "district_code",
          "query": "select district_code, district_name from student_attendance_district",
          "actions": {
            "query": "select block_code, block_name from student_attendance_block where district_code={district_code}",
            "level": "block"
          }
        },
        {
          "name": "Block",
          "labelProp": "block_name",
          "valueProp": "block_code",
          "query": "select block_code, block_name from student_attendance_block where district_code={district_code}",
          "actions": {
            "query": "select cluster_code, cluster_name from student_attendance_cluster where block_code={block_code}"
          }
        },
        {
          "name": "Cluster",
          "labelProp": "cluster_name",
          "valueProp": "cluster_code",
          "query": "select cluster_code, cluster_name from student_attendance_block where block_code={block_code}",
          "actions": {
            "query": "select cluster_code, cluster_name from student_attendance_cluster where block_code={block_code}"
          }
        }
      ],
      "levels": [
        {
          "name": "Blocks",
          "value": "block",
          "query": "Select * from table_name"
        },
        {
          "name": "Clusters",
          "value": "cluster",
          "query": "Select * from table_name"
        }
      ],
      "options": {
        "chart": {
          "type": "map",
          "title": "Student Attendance"
        },
        "map": {
          "indicator": "attendance",
          "indicatorType": "percent",
          "legend": {
            "title": "Student Attendance"
          },
          "latitude": "latitude",
          "longitude": "longitude"
        },
        "tooltip": "District ID: {district_code}\nDistrict Name: {district_name}\nAttendance: {attendance}"
      }
    };

    let { query, levels, filters, options } = config;
    
    this._wrapperService.constructFilters(this.filters, filters);
    query = buildQuery(query, this.levels, this.filters);

    this._commonService.getReportDataNew(query).subscribe((res: any) => {
      let { rows } = res;
      let { map: { indicator, indicatorType, legend, latitude, longitude }, tooltip } = options;
      this.reportData = {
        data: rows.map(row => {
          row = {
            ...row,
            Latitude: row[latitude],
            Longitude: row[longitude],
            indicator: row[indicator],
            tooltip: this._wrapperService.formatToolTip(tooltip, row)
          };         

          return row;
        }),
        options: {
          reportIndicatorType: indicatorType,
          legend
        }
      }
    });
  }

  filtersUpdated(filters: any): void {
    this.filters = filters;
    this.getReportData();
  }

  onSelectLevel(event: any): void {
    this.levels = event.items;
    this.getReportData();
  }
}
