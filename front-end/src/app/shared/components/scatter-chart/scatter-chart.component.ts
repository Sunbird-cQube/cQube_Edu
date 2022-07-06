import { Component, Input, OnInit } from '@angular/core';
import { ChartDataset, ChartType, ChartOptions } from 'chart.js';
// import { Label } from 'ng2-charts';

@Component({
  selector: 'app-scatter-chart',
  templateUrl: './scatter-chart.component.html',
  styleUrls: ['./scatter-chart.component.scss']
})
export class ScatterChartComponent implements OnInit {

  // public scatterChart!: Chart;
  height = window.innerHeight;
  @Input() result!: string[];


  public xAxisFilter: any = [];
  public yAxisFilter: any = [];

  public xAxis = ['Grade1', 'Grade2', 'Grade3'] 

  public scatterChartOption: ChartOptions = {
    responsive: true,
  };

  public scatterChartData: ChartDataset[] = [
    {
      data: [
        { x: 1, y: 1 },
        { x: 2, y: 3 },
        { x: 3, y: 2 },
        { x: 4, y: 4 },
        { x: 5, y: 3 },
        { x: 1, y: 14},
        { x: 2, y: 10 },
        { x: 3, y: 2 },
        { x: 4, y: 4 },
        { x: 5, y: 3 },
        { x: 1, y: 13 },
        { x: 2, y: 3 },
        { x: 3, y: 2 },
        { x: 4, y: 4 },
        { x: 5, y: 3 },
        { x: 1, y: 12 },
        { x: 2, y: 3 },
        { x: 3, y: 2 },
        { x: 4, y: 4 },
        { x: 5, y: 6 },
        { x: 1, y: 10 },
        { x: 2, y: 3 },
        { x: 3, y: 2 },
        { x: 4, y: 4 },
        { x: 5, y: 3 },
        { x: 1, y: 18 },
        { x: 2, y: 3 },
        { x: 3, y: 7 },
        { x: 4, y: 6 },
        { x: 5, y: 3 },
      ],
      label: "NAS",
      pointRadius: 6,
    },
  ];
  public scatterChartType: ChartType = 'scatter';

  constructor() { }

  ngOnInit(): void {
  }





}
