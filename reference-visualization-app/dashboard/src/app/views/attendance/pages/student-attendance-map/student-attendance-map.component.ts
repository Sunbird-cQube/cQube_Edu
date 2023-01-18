import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/services/common/common.service';
import { WrapperService } from 'src/app/core/services/wrapper.service';
import { buildQuery, parseTimeSeriesQuery } from 'src/app/utilities/QueryBuilder';
import { environment } from 'src/environments/environment';
import { config } from '../../config/attendance_config';

@Component({
  selector: 'app-student-attendance-map',
  templateUrl: './student-attendance-map.component.html',
  styleUrls: ['./student-attendance-map.component.scss']
})
export class StudentAttendanceMapComponent implements OnInit {

  reportName: string = 'student_attendance_map';
  filters: any = [];
  metricFilter: any = {};
  levels: any;
  reportData: any;
  startDate: any;
  endDate: any;
  minDate: any;
  maxDate: any;
  level = environment.config === 'national' ? 'state' : 'district';
  currentHierarchyLevel: any = this.level === 'state' ? 1 : 2;

  constructor(private readonly _commonService: CommonService, private readonly _wrapperService: WrapperService) { }

  ngOnInit(): void {
    this.getReportData();
  }

  async getReportData(): Promise<void> {
    let reportConfig = config

    let { timeSeriesQueries, queries, levels, filters, options, defaultLevel } = reportConfig[this.reportName];
    if (this.levels === undefined && levels?.length > 0) {
      levels[0].selected = true;
      this.levels = levels;
      this.updateLevels(true);
    }
    let onLoadQuery;

    this.filters = await this._wrapperService.constructFilters(this.filters, filters);

    Object.keys(queries).forEach((key: any) => {
      if (this.startDate !== undefined && this.endDate !== undefined && Object.keys(timeSeriesQueries).length > 0) {
        onLoadQuery = parseTimeSeriesQuery(timeSeriesQueries[key], this.startDate, this.endDate)
      }
      else {
        onLoadQuery = queries[key]
      }
      let query = buildQuery(onLoadQuery, defaultLevel, this.levels, this.filters, this.startDate, this.endDate, key);

      if (key === 'map') {
        this.getMapReportData(query, options);
      }
    })
  }

  getMapReportData(query: any, options: any): void {
    this._commonService.getReportDataNew(query).subscribe((res: any) => {
      let { rows } = res;
      let { map: { indicator, indicatorType, legend, metrics, metricFilterNeeded, tooltipMetrics } } = options ?? {};
      let selectedMetric = {
        name: undefined,
        value: undefined
      }
      if (metricFilterNeeded && metrics && Object.keys(this.metricFilter).length === 0) {
        this.metricFilter = {
          name: "Metrics to be shown",
          options: metrics,
          value: null
        };


      }

      if (this.metricFilter.value !== null) {
        let results = metrics.filter((metric: any) => {
          return this.metricFilter.value == metric.value
        })
        selectedMetric = results.length > 0 ? results[0] : selectedMetric
      }

      if (metrics && indicator && Object.keys(this.metricFilter).length > 0 && this.metricFilter.value === null) {
        let results = metrics.filter((metric: any) => {
          return indicator == metric.value
        })
        selectedMetric = results.length > 0 ? results[0] : selectedMetric
        this.metricFilter.value = indicator;
      }

      this.reportData = {
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
          row = {
            ...row,
            Latitude: row['latitude'],
            Longitude: row['longitude'],
            indicator: Number(row[selectedMetric.value]),
            tooltip: this._wrapperService.constructTooltip(tooltipMetrics, row, selectedMetric.value)
          };

          return row;
        }),
        options: {
          reportIndicatorType: indicatorType,
          legend,
          selectedMetric: selectedMetric.name
        }
      }
    });
  }

  async filtersUpdated(filters: any): Promise<void> {
    await new Promise(r => setTimeout(r, 100));
    this.filters = filters
    setTimeout(() => {
      let tempLevel = this.level === 'state' ? 1 : 2;
      this.filters.forEach((filter: any) => {
        tempLevel = filter.hierarchyLevel > tempLevel ? filter.hierarchyLevel : tempLevel;
      })
      this.currentHierarchyLevel = tempLevel;
      this.updateLevels(false);
    }, 100);
    this.getReportData();
  }

  onSelectMetricFilter(metricFilter: any): void {
    this.metricFilter = metricFilter
    this.getReportData();
  }

  onSelectLevel(levels: any): void {
    this.levels = levels.items;
    this.getReportData();
  }

  timeSeriesUpdated(event: any): void {
    this.startDate = event?.startDate?.toDate().toISOString().split('T')[0]
    this.endDate = event?.endDate?.toDate().toISOString().split('T')[0]
    this.getReportData();
  }

  updateLevels(init: boolean): void {
    let flag = 1;
    this.levels = this.levels.map((level: any) => {
      if (level.hierarchyLevel >= this.currentHierarchyLevel) {
        level.hidden = false;
        if (flag) {
          level.selected = true;
          flag = 0;
        }
        else {
          level.selected = false;
        }
      }
      else {
        level.selected = false;
        level.hidden = true;
      }
      return level;
    });
    if (!init) this.getReportData();
  }


  async drillDownFilterUpdate(value: any) {
    for (let i = 0; i < Object.keys(value).length; i++) {
      let id = Object.keys(value)[i]
      await new Promise(r => setTimeout(r, 500));
      let filters = [...this.filters];
      filters.map(async (filter: any) => {
        if (filter.valueProp === id) {
          filter.value = value[id]
        }
        return filter
      });
      this.filtersUpdated(filters)
    }
  }

}
