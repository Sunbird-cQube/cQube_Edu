import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import * as Highcharts from "highcharts/highstock";
import * as HighchartsMore from "highcharts/highcharts-more";
import { HighchartsConfig } from 'src/app/core/config/HighchartsConfig';
import { IBarChartSeries } from 'src/app/core/models/IBarChat';

const HighchartsMore2: any = HighchartsMore;
HighchartsMore2(Highcharts);

@Component({
  selector: 'app-multi-bar-chart',
  templateUrl: './multi-bar-chart.component.html',
  styleUrls: ['./multi-bar-chart.component.scss']
})
export class MultiBarChartComponent implements OnInit, AfterViewInit {
  chart: Highcharts.Chart | undefined;
  @Input() height = 50;
  @Input() title: string | undefined;
  @Input() categories: string[] | undefined;
  @Input() series: IBarChartSeries<number | string>[] | undefined;
  @Input() gridLineColor: string = '#aaa';

  @ViewChild('container') container: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.createBarChart();
  }

  createBarChart(): void {
    let ref:MultiBarChartComponent = this;
    this.chart = Highcharts.chart(this.container.nativeElement, {
      chart: {
        type: 'bar',
        height:400,
        width:400
      },
      title: {
          text: this.title
      },
      xAxis: {
          min: 0,
          max: 6.5,
          categories: this.categories,
          title: {
              text: null
          },
          scrollbar: {
            minWidth: 2,
            enabled: true,
            opposite: true
          },
          gridLineColor: this.gridLineColor
      },
      yAxis: {
          min: 0,
          minTickInterval: 1000,
          title: {
              text: null
          },
          gridLineColor: this.gridLineColor
      },
      plotOptions: {
          bar: {
              dataLabels: {
                  enabled: true
              }
          }
      },
      legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          x: -40,
          y: 80,
          floating: true,
          borderWidth: 1,
          backgroundColor: '#FFFFFF',
          shadow: true
      },
      credits: {
          enabled: false
      },
      series: this.series
  }, function(this: any) {

  });
  }
}
