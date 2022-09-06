import { Component, Input, OnChanges, OnInit, ViewChild, SimpleChanges } from '@angular/core';
import * as Highcharts from "highcharts/highstock";
import * as HighchartsMore from "highcharts/highcharts-more";

const HighchartsMore2: any = HighchartsMore;
HighchartsMore2(Highcharts);

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, OnChanges {

  chart!: Highcharts.Chart;
  @Input() height: number | string = 'auto';
  @Input() title!: string;
  @Input() options: Highcharts.Options | undefined;
  @Input() data: any = [
    {
      name: 'data 1',
      arr: [500, 700, 555, 444, 777, 877, 944, 567, 666, 789, 456, 654]
    },
    {
      name: 'data 2',
      arr: [677, 455, 677, 877, 455, 778, 888, 567, 785, 488, 567, 654]
    }
    
  ]

  @ViewChild('container') container: any;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.createLineChart();
    }, 100);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data !== undefined) {
      setTimeout(() => {
        this.createLineChart();
      }, 100);
    }
    console.log(changes)
  }

  createLineChart(): void {
    let ref: LineChartComponent = this;
    let defaultOptions: Highcharts.Options = {
      chart: {
        type: "line",
        plotBackgroundColor: "transparent",
        plotShadow: false,
        backgroundColor: "transparent",
      },
      title: {
        text: "",
      },
      yAxis: {
        title: {
          text: "Value"
        }
      },

      xAxis: {
        title: {
          text: "Days",
        },

        // type: "datetime",

        labels: {
          rotation: -20
        },
      },
      credits: {
        enabled: false,
      },
      tooltip: {
        shared: true,
      },

      plotOptions: {
        series: {
          stickyTracking: false
        },
      },

      series: [],
    };
    this.chart = Highcharts.chart(this.container.nativeElement, defaultOptions, function(this: any) {
    });
    this.data.forEach((series:any) => {
      this.chart.addSeries({
        name: series.name,
        data: series.arr,
        type: 'line'
      })
    });
    this.chart.redraw()
  }
}
