import { Component, Input, OnChanges, OnInit, ViewChild, SimpleChanges } from '@angular/core';
import * as Highcharts from "highcharts/highstock";
import * as HighchartsMore from "highcharts/highcharts-more";

const HighchartsMore2: any = HighchartsMore;
HighchartsMore2(Highcharts);

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.scss']
})
export class AreaChartComponent implements OnInit, OnChanges {
  chart!: Highcharts.Chart;
  @Input() height: number | string = 'auto';
  @Input() title!: string;
  @Input() data: any = {"result":{"data":[{"month":"Jun_20","plays":0},{"month":"Jul_20","plays":40475},{"month":"Aug_20","plays":464124},{"month":"Sep_20","plays":673279},{"month":"Oct_20","plays":149363},{"month":"Nov_20","plays":155345},{"month":"Dec_20","plays":76822},{"month":"Jan_21","plays":278393},{"month":"Feb_21","plays":474132},{"month":"Mar_21","plays":952169},{"month":"Apr_21","plays":0},{"month":"May_21","plays":0},{"month":"Jun_21","plays":302260},{"month":"Jul_21","plays":475642},{"month":"Aug_21","plays":590173},{"month":"Sep_21","plays":880715},{"month":"Oct_21","plays":116678},{"month":"Nov_21","plays":195413},{"month":"Dec_21","plays":207005},{"month":"Jan_22","plays":313180},{"month":"Feb_22","plays":386858},{"month":"Mar_22","plays":0}]},"downloadData":{"data":[{"month":"Jun_20","plays":0},{"month":"Jul_20","plays":40475},{"month":"Aug_20","plays":464124},{"month":"Sep_20","plays":673279},{"month":"Oct_20","plays":149363},{"month":"Nov_20","plays":155345},{"month":"Dec_20","plays":76822},{"month":"Jan_21","plays":278393},{"month":"Feb_21","plays":474132},{"month":"Mar_21","plays":952169},{"month":"Apr_21","plays":0},{"month":"May_21","plays":0},{"month":"Jun_21","plays":302260},{"month":"Jul_21","plays":475642},{"month":"Aug_21","plays":590173},{"month":"Sep_21","plays":880715},{"month":"Oct_21","plays":116678},{"month":"Nov_21","plays":195413},{"month":"Dec_21","plays":207005},{"month":"Jan_22","plays":313180},{"month":"Feb_22","plays":386858},{"month":"Mar_22","plays":0}]}}
  @Input() metaData: any = {
    title: 'Heartbeat of the Nation Learning',
    seriesName: 'Total Content Plays against months',
    xaxisLabel:  'Month',
    xaxisProperty: 'month',
    yaxisLabel: 'Total Content Plays',
    yaxisProperty: 'plays',
  }
  @ViewChild('container') container: any;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.createAreaChart();
    }, 100);
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  createAreaChart(){
    let ref: AreaChartComponent = this;
    let defaultOptions: Highcharts.Options = {
      chart: {
        type: 'area'
    },
    accessibility: {
        description: 'Image description: An area chart compares the nuclear stockpiles of the USA and the USSR/Russia between 1945 and 2017. The number of nuclear weapons is plotted on the Y-axis and the years on the X-axis. The chart is interactive, and the year-on-year stockpile levels can be traced for each country. The US has a stockpile of 6 nuclear weapons at the dawn of the nuclear age in 1945. This number has gradually increased to 369 by 1950 when the USSR enters the arms race with 6 weapons. At this point, the US starts to rapidly build its stockpile culminating in 32,040 warheads by 1966 compared to the USSR’s 7,089. From this peak in 1966, the US stockpile gradually decreases as the USSR’s stockpile expands. By 1978 the USSR has closed the nuclear gap at 25,393. The USSR stockpile continues to grow until it reaches a peak of 45,000 in 1986 compared to the US arsenal of 24,401. From 1986, the nuclear stockpiles of both countries start to fall. By 2000, the numbers have fallen to 10,577 and 21,000 for the US and Russia, respectively. The decreases continue until 2017 at which point the US holds 4,018 weapons compared to Russia’s 4,500.'
    },
    title: {
        text: this.metaData.title
    },
    xAxis: {
        allowDecimals: false,
        categories: this.data.result.data.map((obj:any) => {
          return obj[this.metaData.xaxisProperty]
        }),
        title: {
          text: this.metaData.xaxisLabel
        }
    },
    yAxis: {
      title: {
        text: this.metaData.yaxisLabel
      }
    },
    tooltip: {
        // headerFormat: '<b>{point.x}</b></br>',
        headerFormat: '',
        // pointFormat: '<b>{series.y} : {point.y:,.0f}</b><br/>'
        pointFormatter: function() {
          console.log(this)
          return '<b>' + ref.metaData.xaxisLabel + ' : '  + this.category + '</br>' + ref.metaData.yaxisLabel + ' : ' + this.y + '</b>'
        }
    },
    plotOptions: {
        area: {
            marker: {
                enabled: true,
                symbol: 'circle',
                radius: 2,
                states: {
                    hover: {
                        enabled: true
                    }
                }
            }
        }
    },
    series: [{
        name: this.metaData.seriesName,
        data: this.data.result.data.map((obj:any) => {
          return obj[this.metaData.yaxisProperty]
        }),
        type: 'area'
    }]
    }
    this.chart = Highcharts.chart(this.container.nativeElement, defaultOptions, function(this: any) {
    });
  }

}
