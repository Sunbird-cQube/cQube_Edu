import { Component, Input, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
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
export class GaugeChartComponent implements OnInit, OnChanges {
  chart!: Highcharts.Chart;
  @Input() height = 350;
  @Input() title!: string;
  @Input() options: Highcharts.Options | undefined;

  @ViewChild('container') container: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.options && this.container) {
        this.createGaugeChart(this.options);
    }
  }

  createGaugeChart(options: Highcharts.Options): void {
    let defaultOptions: Highcharts.Options = {
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
                [0.9, '#66a3ff'],// red
                [0.5, '#0052cc'],// yellow
                [0.1, '#002966'], // green
            ],
            lineWidth: 0,
            tickWidth: 0,
            minorTickInterval: null,
            tickAmount: 2,
            title: {
                y: 85,
                text: '',
                style:{
                    fontSize: '1rem'
                }
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
        series: [],
        responsive:{
          rules: [
            {
              chartOptions: {
                yAxis: {
                  title: {
                    y: 140,
                    style:{
                        fontSize: '1.3rem'
                    }
                  }
                }
              },
              condition: {
                callback: function() {
                  return window.innerWidth >= 2560
                },
                minWidth: 2560
              }
            }
          ]
        }
    };
    this.chart = Highcharts.chart(this.container.nativeElement, Highcharts.merge(defaultOptions, options),  function(this: any) {

    });
  }

}
