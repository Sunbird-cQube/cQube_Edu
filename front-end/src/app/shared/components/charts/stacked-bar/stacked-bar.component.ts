import { Component, Input, OnChanges, OnInit, ViewChild, SimpleChanges } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import * as Highcharts from "highcharts/highstock";
import * as HighchartsMore from "highcharts/highcharts-more";

const HighchartsMore2: any = HighchartsMore;
HighchartsMore2(Highcharts);

@Component({
  selector: 'app-stacked-bar',
  templateUrl: './stacked-bar.component.html',
  styleUrls: ['./stacked-bar.component.scss'],
  providers: [DecimalPipe]
})
export class StackedBarComponent implements OnInit, OnChanges {
  chart!: Highcharts.Chart;
  @Input() height: number | string = 'auto';
  @Input() title!: string;
  @Input() options: Highcharts.Options | undefined;
  @ViewChild('container') container: any;
  
  constructor(private readonly _decimalPipe: DecimalPipe) { }

  ngOnInit(): void {
   
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.options !== undefined) {
      setTimeout(() => {
        this.createStackedBarChart(this.options);
      }, 100);
    }
  }

  createStackedBarChart(options: Highcharts.Options | undefined): void {
    let ref: StackedBarComponent = this;
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
        max: 100,
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
        },
        series: {
          stacking: 'normal'
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
      series:[]
    };
    this.chart = Highcharts.chart(this.container.nativeElement, Highcharts.merge(defaultOptions, options), function (this: any) {
    });
  }
}
