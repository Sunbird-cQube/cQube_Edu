import { Component, Input, OnChanges, OnInit, ViewChild, SimpleChanges, AfterViewInit } from '@angular/core';
import * as Highcharts from "highcharts/highstock";
import * as HighchartsMore from "highcharts/highcharts-more";
import { cloneDeep } from "lodash";

const HighchartsMore2: any = HighchartsMore;
HighchartsMore2(Highcharts);

@Component({
  selector: 'app-multi-bar-chart',
  templateUrl: './multi-bar-chart.component.html',
  styleUrls: ['./multi-bar-chart.component.scss']
})
export class MultiBarChartComponent implements OnInit, OnChanges, AfterViewInit {
  chart!: Highcharts.Chart;
  @Input() height: number | string = 'auto';
  @Input() title!: string;
  @Input() options: Highcharts.Options | undefined;

  defaultOptions: Highcharts.Options | undefined;
  series: Highcharts.SeriesOptionsType[] | undefined;
  pageSize = 100;
  totalRecords = 0;
  pageIndex = 0;

  @ViewChild('container') container: any;
  @ViewChild('left') left: any;
  @ViewChild('right') right: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.options !== undefined) {
      let pageSize = (this.options?.series as any)[0].data.length < this.pageSize ? (this.options?.series as any)[0].data.length : this.pageSize;
      
      setTimeout(() => {
        this.height = pageSize * 45 + 100;
        this.totalRecords = (this.options?.series as any)[0].data.length;
      });

      setTimeout(() => {
        this.series = cloneDeep(this.options?.series);
        (this.options as Highcharts.Options).series = this.options?.series?.map((series: any) => {
          series.data = series.data.slice(this.pageSize * this.pageIndex, this.pageSize * this.pageIndex + this.pageSize);
          return series;
        });
        this.createMultiBarChart(this.options);
      }, 100);
    }
  } 

  onPageChange(event: any): void {
    let originalSeries = cloneDeep(this.series);
    this.pageSize = event.pageSize;
    this.height = this.pageSize * 45 + 100;
    (this.options as Highcharts.Options).series = originalSeries?.map((series: any) => {
      series.data = series.data.slice(this.pageSize * event.pageIndex, this.pageSize * event.pageIndex + this.pageSize);
      return series;
    });
    
    this.updateChart(this.options);
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100)
  }

  createMultiBarChart(options: Highcharts.Options | undefined): void {
    let ref: MultiBarChartComponent = this;
    let defaultOptions: Highcharts.Options = {
      chart: {
        type: 'bar',
        marginTop: 75
      },
      title: {
        text: ""
      },
      xAxis: {
        categories: [],
        title: {
          text: null
        },
        scrollbar: {
          enabled: false
        },
        gridLineColor: 'transparent'
      },
      yAxis: {
        min: 0,
        title: {
          text: null
        },
        gridLineColor: 'transparent'
      },
      plotOptions: {
        bar: {
          dataLabels: {
              enabled: true,
              crop: false,
              allowOverlap: true,
              formatter: function(this: any) {
                return new Intl.NumberFormat('en-IN').format(this.y);
              }
          },
          pointWidth: 10,
          pointPadding: 0.2,
          minPointLength: 10
        },
        series: {
          events: {
            legendItemClick: function (e) {
              e.preventDefault();
            }
          },
          animation: false
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        floating: true,
        borderWidth: 0,
        shadow: false
      },
      tooltip: {
        shared: true,
        formatter: function (this: any) {
          return this.points.reduce(function (s: any, point: any) {
            return s + '<br/>' + point.series.name + ': ' + new Intl.NumberFormat('en-IN').format(point.y);
          }, '<b>' + this.x + '</b>');
        },
        enabled: true
      },
      credits: {
        enabled: false
      },
      series: []
    };
    this.defaultOptions = defaultOptions;
    this.chart = Highcharts.chart(this.container.nativeElement, Highcharts.merge(defaultOptions, options), function (this: any) {
    });
  }

  updateChart(options: any) {
    this.chart.update(Highcharts.merge(this.defaultOptions, options))
  }
}
