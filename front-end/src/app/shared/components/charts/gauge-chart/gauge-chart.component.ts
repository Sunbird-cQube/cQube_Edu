import { Component, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import * as Highcharts from "highcharts/highstock";
import * as HighchartsMore from "highcharts/highcharts-more";
import * as solidGauge from 'highcharts/modules/solid-gauge';

const HighchartsMore2: any = HighchartsMore;
HighchartsMore2(Highcharts);
const solidGauge2: any = solidGauge;
solidGauge2(Highcharts);

@Component({
  selector: 'app-gauge-chart',
  templateUrl: './gauge-chart.component.html',
  styleUrls: ['./gauge-chart.component.scss']
})
export class GaugeChartComponent implements OnInit, AfterViewInit {
  chart!: Highcharts.Chart;
  @Input() height = 350;
  @Input() title!: string;
  @Input() categories!: string[];
  @Input() series!: any[];
  @Input() gridLineColor: string = '#aaa';

  @ViewChild('container') container: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.createBarChart();
  }

  createBarChart(): void {
    let ref: GaugeChartComponent = this;
    this.chart = Highcharts.chart(this.container.nativeElement, {
      chart: {
        type: 'solidgauge'
      },
      title: {
        text: ""
      },
      pane: {
          center: ['50%', '80%'],
          size: '100%',
          startAngle: -90,
          endAngle: 90,
          background: [{
              backgroundColor: { linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 }, stops: [[0, '#ffffff'], [1, '#e6e6e6']] },
              innerRadius: '80%',
              outerRadius: '100%',
              shape: 'arc'
          }]
      },
      exporting: {
          enabled: false
      },
      tooltip: {
          enabled: false
      },
      // the value axis
      yAxis: {
          stops: [
              [0.9, '#DF5353'],// red
              [0.5, '#DDDF0D'],// yellow
              [0.1, '#55BF3B'], // green
          ],
          lineWidth: 0,
          tickWidth: 0,
          minorTickInterval: null,
          tickAmount: 2,
          title: {
              y: 85,
              text: 'Overall ETB coverage'
          },
          labels: {
              y: 16
          },
          min: 0,
          max: 100
      },
      plotOptions: {
          solidgauge: {
              dataLabels: {
                  y: 5,
                  borderWidth: 0,
                  useHTML: true
              }
          }
      },
      credits: {
          enabled: false
      },
      series: [{
          type: 'solidgauge',
          name: 'Speed',
          data: [60.6],
          innerRadius: '80%',
          dataLabels: {
              format:
                  '<div style="text-align:center">' +
                  '<span style="font-size:25px">{y}%</span><br/>' +
                  '</div>'
          },
          tooltip: {
              valueSuffix: ' %'
          }
      }]
    },  function(this: any) {

    });
  }

}
