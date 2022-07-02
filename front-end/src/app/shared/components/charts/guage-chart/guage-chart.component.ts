import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from "highcharts/highstock";
import * as HighchartsMore from "highcharts/highcharts-more";
import { IBarChartSeries } from 'src/app/core/models/IBarChat';

const HighchartsMore2: any = HighchartsMore;
HighchartsMore2(Highcharts);

@Component({
  selector: 'app-guage-chart',
  templateUrl: './guage-chart.component.html',
  styleUrls: ['./guage-chart.component.scss']
})
export class GuageChartComponent implements OnInit {
  chart!: Highcharts.Chart;
  @Input() height = 50;
  @Input() title!: string;
  @Input() categories!: string[];
  @Input() series!: IBarChartSeries<number | string>[];
  @Input() gridLineColor: string = '#aaa';

  constructor() { }

  ngOnInit(): void {
  }

}
