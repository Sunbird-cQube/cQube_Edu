import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import * as Highcharts from "highcharts/highstock";
import * as HighchartsMore from "highcharts/highcharts-more";

@Component({
  selector: 'app-scatter-chart',
  templateUrl: './scatter-chart.component.html',
  styleUrls: ['./scatter-chart.component.scss']
})
export class ScatterChartComponent implements OnInit, OnChanges {
  // height = 300;
  // @Input() data!: any;


  // public scatterChartOption: ChartOptions = {
  //   responsive: true,
  //   scales: {
  //     x: {
  //       ticks: {
  //           stepSize: 10
  //       }
  //     }
  //   },
  //   plugins: {
  //     tooltip: {
  //       callbacks: {
  //         label: (context: any) => {
  //           if (context.raw.data) {
  //             let tooltipData = context.raw.data.split('<br>');
  //             return tooltipData;
  //           }
  //         }
  //       }
  //     }
  //   }
  // };

  // public scatterChartData!: any;
  // public scatterChartType: ChartType = 'scatter';

  // constructor() { }

  // ngOnInit(): void {
  // }

  // ngAfterViewInit(): void {
  //   this.setScatterChartData();
  // }

  // ngOnChanges(): void {
  //   this.setScatterChartData();
  // }

  // setScatterChartData(): void {
  //   if (this.data !== undefined) {
  //     this.scatterChartData = [
  //       {
  //         data: this.data,
  //         label: "NAS",
  //         pointRadius: 6,
  //       }
  //     ];
  //   }
  // }

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
    let ref: ScatterChartComponent = this;
    let defaultOptions: Highcharts.Options = {
      chart: {
        type: 'scatter',
        zoomType: 'xy',
        marginTop: 100
      },
      title: {
          text: ""
      },
      xAxis: {
          min: 0,
          title: {
              text: null
          },
          scrollbar: {
            enabled: false
          },
          gridLineColor: 'transparent',
          tickInterval: 10
      },
      yAxis: {
          min: 0,
          title: {
              text: null
          },
          gridLineColor: 'transparent',
          tickInterval: 10
      },
      plotOptions: {
        scatter: {
          marker: {
              radius: 5,
              states: {
                  hover: {
                      enabled: true,
                      lineColor: 'rgb(100,100,100)'
                  }
              }
          },
          states: {
              hover: {
                enabled: false
              }
          }
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
      series: []
    };
    this.chart = Highcharts.chart(this.container.nativeElement, Highcharts.merge(defaultOptions, options), function(this: any) {
    });
  }
}
