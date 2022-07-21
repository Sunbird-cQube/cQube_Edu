import { AfterViewInit, Component, Input, OnChanges, OnInit } from '@angular/core';
import { ChartDataset, ChartType, ChartOptions } from 'chart.js';
// import { Label } from 'ng2-charts';

@Component({
  selector: 'app-scatter-chart',
  templateUrl: './scatter-chart.component.html',
  styleUrls: ['./scatter-chart.component.scss']
})
export class ScatterChartComponent implements OnInit, AfterViewInit, OnChanges {

  // public scatterChart!: Chart;
  height = window.innerHeight;
  @Input() data!: any;


  public scatterChartOption: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        ticks: {
            stepSize: 10
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            if (context.raw.data) {
              let tooltipData = context.raw.data.split('<br>');
              return tooltipData;
            }
          }
        }
      }
    }
  };

  public scatterChartData!: any;
  public scatterChartType: ChartType = 'scatter';

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.setScatterChartData();
  }

  ngOnChanges(): void {
    this.setScatterChartData();
  }

  setScatterChartData(): void {
    if (this.data !== undefined) {
      this.scatterChartData = [
        {
          data: this.data,
          label: "NAS",
          pointRadius: 6,
        }
      ];
    }
  }
}
