import { Component, OnInit } from '@angular/core';
import * as Highcharts from "highcharts/highstock";

@Component({
  selector: 'app-development-goal-bar',
  templateUrl: './development-goal-bar.component.html',
  styleUrls: ['./development-goal-bar.component.scss']
})
export class DevelopmentGoalBarComponent implements OnInit {
  options: Highcharts.Options | undefined;

  constructor() { 
    this.getBarData();
  }

  ngOnInit(): void {
  }

  getBarData() {
    this.options = {
      series: [
      {
        type: 'bar',
        color: "#DBADEC",
        name: 'Content count',
        data: [245, 75, 104, 85]
        
      }
       ]
    };
    }
  

}
