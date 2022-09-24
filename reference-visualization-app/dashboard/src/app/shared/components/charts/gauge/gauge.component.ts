import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
// for chartjs gauge chart
import Chart from 'chartjs-gauge';

// for apex radialbar chart
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexFill,
  ChartComponent,
  ApexStroke,
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
};

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  // styleUrls: ['./gauge.component.scss']
})
export class GaugeComponent implements OnInit {
  public chart: Chart; // for chartjs gauge
  @ViewChild('container') container: any;

  @ViewChild('apexChart') apexChart: ChartComponent;
  public chartOptions: Partial<ChartOptions>; // for apex
  @Input() gaugeData!: any;

  // public canShow = false; 
  // @Input() height = 300;
  // @Input() width = 200;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      // this.createChart()
      this.apexCreatChart()
    }, 100);
  }

  // used for chartjs gauge chart
  createChart() {
    var ctx: CanvasRenderingContext2D = this.container.nativeElement.getContext("2d");
    // this.canShow = true
    this.chart = new Chart(ctx, {
      type: 'gauge',
      data: {
        datasets: [{
          value: 80,
          minValue: 0,
          data: [100],
          backgroundColor: ['orange'],
        }]
      },
      options: {
        needle: {
          radiusPercentage: 2,
          widthPercentage: 3.2,
          lengthPercentage: 80,
          // color: 'transparent',
          display: false
        },
        valueLabel: {
          display: true,
          formatter: (value) => {
            return Math.round(value);
          },
          color: 'rgba(255, 255, 255, 1)',
          backgroundColor: 'rgba(0, 0, 0, 1)',
          borderRadius: 5,
          padding: {
            top: 10,
            bottom: 10
          }
        }
      }
    });
  }

  apexCreatChart() {
    this.chartOptions = {
      series: [this.gaugeData.percentage],
      chart: {
        height: 350,
        type: "radialBar"
      },
      fill: {
        // type: "solid",
        // colors: ['rgb(0, 41, 102)'],
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "vertical",
          gradientToColors: ["rgb(0, 41, 102)"],
          stops: [0, 100]
        }
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "70",
            margin: 15,
          },
          dataLabels: {
            // showOn: "always",
            name: {
              offsetY: -10,
              show: true,
              color: "#888",
              fontSize: "13px"
            },
            value: {
              color: "#111",
              fontSize: "30px",
              show: true
            }
          },
        }
      },
      stroke: {
        lineCap: "round",
      },
      labels: [`${this.gaugeData.options.title}`]
    };
  }

}
