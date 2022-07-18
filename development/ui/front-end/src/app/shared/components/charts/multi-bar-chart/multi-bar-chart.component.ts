import { Component, Input, OnChanges, OnInit, ViewChild, SimpleChanges, AfterViewInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import * as Highcharts from "highcharts/highstock";
import * as HighchartsMore from "highcharts/highcharts-more";

const HighchartsMore2: any = HighchartsMore;
HighchartsMore2(Highcharts);

@Component({
  selector: 'app-multi-bar-chart',
  templateUrl: './multi-bar-chart.component.html',
  styleUrls: ['./multi-bar-chart.component.scss'],
  providers: [DecimalPipe]
})
export class MultiBarChartComponent implements OnInit, OnChanges, AfterViewInit {
  chart!: Highcharts.Chart;
  @Input() height: number | string = 'auto';
  @Input() title!: string;
  @Input() options: Highcharts.Options | undefined;
  defaultOptions: Highcharts.Options | undefined;

  @ViewChild('container') container: any;

  constructor(private readonly _decimalPipe: DecimalPipe) { }

  ngOnInit(): void {
    alert('init multi')
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.createMultiBarChart(this.options);
    }, 100);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (this.options !== undefined) {
    //   setTimeout(() => {
    //     // this.createMultiBarChart(this.options);
    //   }, 100);
    // }
    if (this.options !== undefined) {
      setTimeout(() => {
        if (!this.chart) {
          this.createMultiBarChart(this.options);
        }
        else {
          this.updateChart(this.options);
        }
      }, 100);
    }
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
            formatter: function () {
              return ref._decimalPipe.transform(this.y, '1.0-0', 'en-IN');
            }
          }
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
            return s + '<br/>' + point.series.name + ': ' + ref._decimalPipe.transform(point.y, '1.0-0', 'en-IN');
          }, '<b>' + this.x + '</b>');
        }
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
