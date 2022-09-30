import { Component, Input, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
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
  styleUrls: ['./gauge.component.scss']
})
export class GaugeComponent implements OnInit, OnChanges {
  @ViewChild('apexChart') apexChart: ChartComponent;
  public chartOptions: Partial<ChartOptions>; // for apex
  @Input() gaugeData!: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.gaugeData){
      this.apexCreatChart();
    }
  }

  apexCreatChart() {
    this.chartOptions = {
      series: [this.gaugeData.percentage],
      chart: {
        type: "radialBar",
        height: 200
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
            margin: 5
          },
          dataLabels: {
            name: {
              show: false
            },
            value: {
              color: "#111",
              fontSize: "1.2rem",
              show: true
            }
          },
        }
      },
      stroke: {
        lineCap: "round",
      }
    };
  }

}
