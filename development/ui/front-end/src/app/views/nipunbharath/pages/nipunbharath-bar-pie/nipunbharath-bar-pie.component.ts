import { Component, OnInit } from '@angular/core';
import * as Highcharts from "highcharts/highstock";
import { PieChartComponent } from 'src/app/shared/components/charts/pie-chart/pie-chart.component';

@Component({
  selector: 'app-nipunbharath-bar-pie',
  templateUrl: './nipunbharath-bar-pie.component.html',
  styleUrls: ['./nipunbharath-bar-pie.component.scss']
})
export class NipunbharathBarPieComponent implements OnInit {
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
    // chart: {
    //   events: {
    //     load: function (this: any) {
    //       let categoryHeight = 20;
    //       this.update({
    //         chart: {
    //           height: categoryHeight * this.pointCount + (this.chartHeight - this.plotHeight)
    //         }
    //       })
    //     }
    //   }
    // },
    // xAxis: {
    //   categories: ['Kerala', 'Madhya Pradesh', 'Telangana', 'Andhra Pradesh ']
    // },
    // yAxis: {
    //   opposite: true
    // },
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
  width = window.innerWidth;
  // height = window.innerHeight;
  height = window.innerHeight;
  onResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }
  
  getpieChart() {
    // let ref: PieChartComponent = this;
    this.chartOptions =  [{
        name: 'Brands',
        colorByPoint: true,
        data: [
        {
          name: 'DG 1',
          y: 432,
          selected: true
        }, {
          name: 'DG 2',
          y: 331
        }, {
          name: 'DG 3',
          y: 253
        }, 
        // {
        //   name: 'Pre-School 1',
        //   y: 94
        // }, {
        //   name: 'Pre-School 2',
        //   y: 81
        // }, {
        //   name: 'Pre-School 3',
        //   y: 103
        // }
      ]
      }]

    
  }


  

}
