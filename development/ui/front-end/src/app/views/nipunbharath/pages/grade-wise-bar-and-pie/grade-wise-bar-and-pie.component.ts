import { Component, OnInit } from '@angular/core';
import * as Highcharts from "highcharts/highstock";

@Component({
  selector: 'app-grade-wise-bar-and-pie',
  templateUrl: './grade-wise-bar-and-pie.component.html',
  styleUrls: ['./grade-wise-bar-and-pie.component.scss']
})
export class GradeWiseBarAndPieComponent implements OnInit {
  options: Highcharts.Options | undefined;
  chart!: Highcharts.Chart;
  chartOptions: any;

  constructor() {
    this.getBarData();
    this.getpieChart();
   }

  ngOnInit(): void {
  }

  getBarData() {
    this.options = {
      series: [
      {
        type: 'bar',
        color: "#34e5eb",
        name: 'Content count',
        data: [80, 70, 80, 50]
        
      }
       ]
    };
    }

    getpieChart() {
      this.chartOptions = {
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
  
      };
    }
}
