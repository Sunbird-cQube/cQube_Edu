import { Component, OnInit } from '@angular/core';
import * as Highcharts from "highcharts/highstock";

@Component({
  selector: 'app-garde-wise-resource',
  templateUrl: './garde-wise-resource.component.html',
  styleUrls: ['./garde-wise-resource.component.scss']
})
export class GardeWiseResourceComponent implements OnInit {
  options: Highcharts.Options | undefined;

  constructor() { 
    this.getBarData();
  }

  ngOnInit(): void {
  }

  getBarData() {
    this.options = {
      xAxis: {
        categories: ['Grade 1', 'Grade 2', 'Grade 3', 'Pre School 1', 'Pre School 2', 'Pre School 3', 'Multi Grade']
      },
      yAxis: {
        opposite: true
      },
      series: [
      {
        type: 'bar',
        color: "#DBADEC",
        name: 'Content count',
        data: [245, 75, 104, 85,768,104,205]
        
      }
       ]
    };
    }
  

}
