import { Component, Input, OnChanges, OnInit, ViewChild, SimpleChanges } from '@angular/core';
import * as Highcharts from "highcharts/highstock";
import * as HighchartsMore from "highcharts/highcharts-more";

const HighchartsMore2: any = HighchartsMore;
HighchartsMore2(Highcharts);

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, OnChanges {
  chart!: Highcharts.Chart;
  @Input() height: number | string = 'auto';
  @Input() title!: string;
  @Input() options: Highcharts.Options | undefined;

  @ViewChild('container') container: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.options !== undefined) {
      setTimeout(() => {
        this.createMultiBarChart(this.options);
      }, 100);
    }
  }

  createMultiBarChart(options: Highcharts.Options | undefined): void {
    let ref: BarChartComponent = this;
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
          gridLineColor: 'transparent',
          labels: {
            formatter: function(this: any) {
              if (typeof this.value === 'number') {
                if (this.value < 1000) {
                  return `${this.value}`;
                } else if (this.value > 999 && this.value <= 9999) {
                  return `${this.value / 1000}K`;
                } else if (this.value > 9999 && this.value <= 9999999) {
                  return `${this.value / 100000}L`;
                } else {
                  return `${this.value / 10000000}Cr`;
                }
              }
              
              return `${this.axis.defaultLabelFormatter.call(this)}`;
            }
          }
      },
      yAxis: {
          min: 0,
          title: {
              text: null
          },
          gridLineColor: 'transparent',
          labels: {
            formatter: function(this: any) {
              if (typeof this.value === 'number') {
                if (this.value < 1000) {
                  return `${this.value}`;
                } else if (this.value > 999 && this.value <= 9999) {
                  return `${this.value / 1000}K`;
                } else if (this.value > 9999 && this.value <= 9999999) {
                  return `${this.value / 100000}L`;
                } else {
                  return `${this.value / 10000000}Cr`;
                }
              }
              
              return `${this.axis.defaultLabelFormatter.call(this)}`;
            }
          }
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
          minPointLength: 10
        },
        series: {
          events: {
            legendItemClick: function (e) {
              e.preventDefault();
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
      credits: {
          enabled: false
      },
      series: [],
      tooltip: {
        formatter: function(this: any) {
          return `${this.series.name}<br><span style="padding: 5px; background: ${this.color}"></span>${this.x}: ${new Intl.NumberFormat('en-IN').format(this.y)}`;
        }
      }
    };
    this.chart = Highcharts.chart(this.container.nativeElement, Highcharts.merge(defaultOptions, options), function(this: any) {
    });
  }
}
