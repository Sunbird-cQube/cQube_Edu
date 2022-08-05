import { Component, Input, OnInit, ViewChild } from '@angular/core';
import * as Highcharts from "highcharts/highstock";
import * as HighchartsMore from "highcharts/highcharts-more";

const HighchartsMore2: any = HighchartsMore;
HighchartsMore2(Highcharts);


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  chart!: Highcharts.Chart;
  chartOptions: any;
  // @Input() height: number | string = 'auto';
  @Input() title!: string;
  @Input() data!: any;
  @ViewChild('container') container: any;
  constructor() {
  }

  ngOnInit(): void {
    console.log('this', this.container)
    if (this.data !== undefined) {
      setTimeout(() => {
        this.createChart(this.data)
      }, 100);
    }
  }



  width = window.innerWidth;
  // height = window.innerHeight;
  height = window.innerHeight;
  onResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }
  createChart(data: any) {
    let ref: PieChartComponent = this;
    this.chartOptions = {
      chart: {
        plotBackgroundColor: 'transparent',
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        backgroundColor: 'transparent'
      },

      title: {
        text: '',
        align: 'left',
        style: {
          fontWeight: 'bold',
        }
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      credits: {
        enabled: false
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        maxHeight: this.height > 1760 ? 800 : this.height > 1160 && this.height < 1760 ? 700 : this.height > 667 && this.height < 1160 ? 400 : 400,
        verticalAlign: 'middle',

        itemStyle: {

          fontSize: this.height > 1760 ? "32px" : this.height > 1160 && this.height < 1760 ? "22px" : this.height > 667 && this.height < 1160 ? "12px" : "10px",
          lineHeight: 3
        }
      },
      plotOptions: {
        pie: {

          size: this.height > 1760 ? 800 : this.height > 1160 && this.height < 1760 ? 600 : this.height > 667 && this.height < 1160 ? 280 : 280,
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            // format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            format: ' {point.y:.f}',
            distance: -50,
            style: {

              fontSize: this.height > 1760 ? "32px" : this.height > 1160 && this.height < 1760 ? "22px" : this.height > 667 && this.height < 1160 ? "12px" : "10px",
            }
          },
          showInLegend: true
        },


      },
      series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
          name: 'Class 1',
          y: 432,
          selected: true
        }, {
          name: 'Class 2',
          y: 331
        }, {
          name: 'Class 3',
          y: 253
        }, {
          name: 'Pre-School 1',
          y: 94
        }, {
          name: 'Pre-School 2',
          y: 81
        }, {
          name: 'Pre-School 3',
          y: 103
        }]
      }]

    };

    this.chart = Highcharts.chart(this.container.nativeElement, Highcharts.merge(this.chartOptions), function (this: any) {
    })
  }
}
