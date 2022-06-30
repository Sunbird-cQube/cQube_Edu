import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import * as Highcharts from "highcharts/highstock";
import * as HighchartsMore from "highcharts/highcharts-more";
import { HighchartsConfig } from 'src/app/core/config/HighchartsConfig';
import { IBarChartSeries } from 'src/app/core/models/IBarChat';

const HighchartsMore2: any = HighchartsMore;
HighchartsMore2(Highcharts);

@Component({
  selector: 'app-multi-bar-chart',
  templateUrl: './multi-bar-chart.component.html',
  styleUrls: ['./multi-bar-chart.component.scss'],
  providers: [DecimalPipe]
})
export class MultiBarChartComponent implements OnInit, AfterViewInit {
  chart: Highcharts.Chart | undefined;
  @Input() height = 50;
  @Input() title: string | undefined;
  @Input() categories: string[] | undefined;
  @Input() series: IBarChartSeries<number | string>[] | undefined;
  @Input() gridLineColor: string = '#aaa';

  @ViewChild('container') container: any;

  constructor(private readonly _decimalPipe: DecimalPipe) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.createBarChart();
  }

  createBarChart(): void {
    let ref: MultiBarChartComponent = this;
    this.chart = Highcharts.chart(this.container.nativeElement, {
      chart: {
        type: 'bar',
        marginTop: 75
      },
      title: {
          text: ""
      },
      xAxis: {
          min: 0,
          max: 6.5,
          categories: this.categories,
          title: {
              text: null
          },
          scrollbar: {
            enabled: true
          },
          gridLineColor: this.gridLineColor
      },
      yAxis: {
          min: 0,
          title: {
              text: null
          },
          gridLineColor: this.gridLineColor,
          
      },
      plotOptions: {
          bar: {
              dataLabels: {
                  enabled: true,
                  formatter: function() {
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
      credits: {
          enabled: false
      },
      series: this.series
  }, function(this: any) {

  });
  }
}
