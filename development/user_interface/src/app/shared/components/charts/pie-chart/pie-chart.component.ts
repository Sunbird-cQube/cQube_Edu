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
  @Input() data: any = { "result": { "name": "Total Content Play" ,"data": [{ "total_content_plays": 9125989, "object_type": "Content", "color_code": "71DFE7", "total_content_plays_percent": 26.66 }, { "total_content_plays": 39040, "object_type": "Content Playlist", "color_code": "630000", "total_content_plays_percent": 0.11 }, { "total_content_plays": 1388554, "object_type": "Course Assessment", "color_code": "FFBC97", "total_content_plays_percent": 4.06 }, { "total_content_plays": 46036, "object_type": "CuriosityQuestionSet", "color_code": "FFCC1D", "total_content_plays_percent": 0.13 }, { "total_content_plays": 5465946, "object_type": "Explanation Content", "color_code": "B91646", "total_content_plays_percent": 15.97 }, { "total_content_plays": 56972, "object_type": "ExplanationReadingMaterial", "color_code": "FF5151", "total_content_plays_percent": 0.17 }, { "total_content_plays": 1779997, "object_type": "ExplanationResource", "color_code": "2F86A6", "total_content_plays_percent": 5.2 }, { "total_content_plays": 24384, "object_type": "ExplanationVideo", "color_code": "064635", "total_content_plays_percent": 0.07 }, { "total_content_plays": 171124, "object_type": "FocusSpot", "color_code": "88E0EF", "total_content_plays_percent": 0.5 }, { "total_content_plays": 377730, "object_type": "Learning Resource", "color_code": "E1578A", "total_content_plays_percent": 1.1 }, { "total_content_plays": 160, "object_type": "LearningActivity", "color_code": "EDD2F3", "total_content_plays_percent": 0 }, { "total_content_plays": 375336, "object_type": "LessonPlan", "color_code": "DD4A48", "total_content_plays_percent": 1.1 }, { "total_content_plays": 800, "object_type": "LessonPlanResource", "color_code": "FFAB4C", "total_content_plays_percent": 0 }, { "total_content_plays": 1244980, "object_type": "Practice Question Set", "color_code": "8A8635", "total_content_plays_percent": 3.64 }, { "total_content_plays": 72229, "object_type": "PracticeQuestionSet", "color_code": "AA14F0", "total_content_plays_percent": 0.21 }, { "total_content_plays": 795609, "object_type": "PracticeResource", "color_code": "864879", "total_content_plays_percent": 2.32 }, { "total_content_plays": 1348952, "object_type": "Resource", "color_code": "E5890A", "total_content_plays_percent": 3.94 }, { "total_content_plays": 2273643, "object_type": "SelfAssess", "color_code": "FF5DA2", "total_content_plays_percent": 6.64 }, { "total_content_plays": 848890, "object_type": "TVLesson", "color_code": "A9333A", "total_content_plays_percent": 2.48 }, { "total_content_plays": 6713956, "object_type": "Teacher Resource", "color_code": "3E7C17", "total_content_plays_percent": 19.61 }, { "total_content_plays": 1648197, "object_type": "eTextBook", "color_code": "B85252", "total_content_plays_percent": 4.81 }, { "total_content_plays": 436165, "object_type": "eTextbook", "color_code": "84DFFF", "total_content_plays_percent": 1.27 }], "footer": { "total_content_plays": 34234689 } } };
  @ViewChild('container') container: any;
  constructor() {
  }

  ngOnInit(): void {
    console.log('this', this.container)
    if (this.data !== undefined) {
      setTimeout(() => {
        this.createPieChart()
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
  createPieChart() {
    let ref: PieChartComponent = this;
    this.chartOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
      },
      title: {
        text: this.title
      },
      tooltip: {
        headerFormat: '<b>Name : {point.key}</b></br>',
        pointFormat: '<b>{series.name}: {point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [
        {
          name: this.data.result.name,
          colorByPoint: true,
          showInLegend: true,
          type: 'pie',
          data: this.data.result.data.map((obj:any) => {
            return {
              name: obj.object_type,
              y: obj.total_content_plays_percent,
              color: '#' + obj.color_code
            }
          })
        }
      ],
      legend: {
        align: 'left',
        verticalAlign: 'top',
        layout: 'vertical'
      }

      // chart: {
      //   plotBackgroundColor: 'transparent',
      //   plotBorderWidth: null,
      //   plotShadow: false,
      //   type: 'pie',
      //   backgroundColor: 'transparent'
      // },

      // title: {
      //   text: '',
      //   align: 'left',
      //   style: {
      //     fontWeight: 'bold',
      //   }
      // },
      // accessibility: {
      //   point: {
      //     valueSuffix: '%'
      //   }
      // },
      // credits: {
      //   enabled: false
      // },
      // legend: {
      //   layout: 'vertical',
      //   align: 'right',
      //   maxHeight: this.height > 1760 ? 800 : this.height > 1160 && this.height < 1760 ? 700 : this.height > 667 && this.height < 1160 ? 400 : 400,
      //   verticalAlign: 'middle',

      //   itemStyle: {

      //     fontSize: this.height > 1760 ? "32px" : this.height > 1160 && this.height < 1760 ? "22px" : this.height > 667 && this.height < 1160 ? "12px" : "10px",
      //     lineHeight: 3
      //   }
      // },
      // plotOptions: {
      //   pie: {

      //     size: this.height > 1760 ? 800 : this.height > 1160 && this.height < 1760 ? 600 : this.height > 667 && this.height < 1160 ? 280 : 280,
      //     allowPointSelect: true,
      //     cursor: 'pointer',
      //     dataLabels: {
      //       enabled: true,
      //       // format: '<b>{point.name}</b>: {point.percentage:.1f} %',
      //       format: ' {point.y:.f}',
      //       distance: -50,
      //       style: {

      //         fontSize: this.height > 1760 ? "32px" : this.height > 1160 && this.height < 1760 ? "22px" : this.height > 667 && this.height < 1160 ? "12px" : "10px",
      //       }
      //     },
      //     showInLegend: true
      //   },


      // },
      // series: [{
      //   name: 'Brands',
      //   colorByPoint: true,
      //   data: [{
      //     name: 'Class 1',
      //     y: 432,
      //     selected: true
      //   }, {
      //     name: 'Class 2',
      //     y: 331
      //   }, {
      //     name: 'Class 3',
      //     y: 253
      //   }, {
      //     name: 'Pre-School 1',
      //     y: 94
      //   }, {
      //     name: 'Pre-School 2',
      //     y: 81
      //   }, {
      //     name: 'Pre-School 3',
      //     y: 103
      //   }]
      // }]

    };

    this.chart = Highcharts.chart(this.container.nativeElement, Highcharts.merge(this.chartOptions), function (this: any) {
    })
    // this.chart.addSeries(
    //   {
    //     name: this.data.result.name,
    //     colorByPoint: true,
    //     showInLegend: true,
    //     type: 'pie',
    //     data: this.data.result.data.map((obj:any) => {
    //       return {
    //         name: obj.object_type,
    //         y: obj.total_content_plays_percent,
    //         color: '#' + obj.color_code
    //       }
    //     })
    //   }
    // )
  }
}
