import {
  Component,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
  SimpleChanges,
  HostListener,
} from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import * as HighchartsMore from 'highcharts/highcharts-more';
import { formatNumberForReport } from 'src/app/utilities/NumberFomatter';

const HighchartsMore2: any = HighchartsMore;
HighchartsMore2(Highcharts);

@Component({
  selector: 'app-stacked-bar',
  templateUrl: './stacked-bar.component.html',
  styleUrls: ['./stacked-bar.component.scss'],
})
export class StackedBarComponent implements OnInit, OnChanges {
  chart!: Highcharts.Chart;
  @Input() height: number | string = 'auto';
  @Input() title!: string;
  @Input() options: Highcharts.Options | undefined;
  @ViewChild('container') container: any;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const elFontSize = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue('font-size');
    const localFontSize = localStorage.getItem('fontSize');
    const currentFontSize = localFontSize ? localFontSize : elFontSize;
    this.chart.update({
      chart: {
        marginTop: Number(currentFontSize) + 80,
      },
      xAxis: {
        labels: {
          step: 1,
          style: {
            fontSize: currentFontSize,
          },
        },
      },
      yAxis: {
        labels: {
          style: {
            fontSize: currentFontSize,
          },
        },
      },
      tooltip: {
        style: {
          fontSize: currentFontSize,
        },
      },
      legend: {
        itemStyle: {
          fontSize: currentFontSize,
        },
      },
      plotOptions: {
        series: {
          dataLabels: {
            style: {
              fontSize: currentFontSize,
            },
          },
        },
      },
    });
  }

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.options !== undefined) {
      setTimeout(() => {
        this.createStackedBarChart(this.options);
      }, 100);
    }
  }

  createStackedBarChart(options: Highcharts.Options | undefined): void {
    let ref: StackedBarComponent = this;
    let defaultOptions: Highcharts.Options = {
      chart: {
        type: 'bar',
        marginTop: 50,
      },
      title: {
        text: '',
      },
      xAxis: {
        categories: [],
        title: {
          text: null,
        },
        scrollbar: {
          enabled: false,
        },
        gridLineColor: 'transparent',
        labels: {
          step: 1,
          style: {
            fontSize: '0.7rem',
            width: 200,
          },
        },
      },
      yAxis: {
        min: 0,
        max: 100,
        title: {
          text: null,
        },
        gridLineColor: 'transparent',
        labels: {
          style: {
            fontSize: '0.7rem',
          },
        },
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
            crop: false,
            allowOverlap: true,
            formatter: function (this: any) {
              return formatNumberForReport(this.y);
            },
          },
          minPointLength: 0,
        },
        series: {
          stickyTracking: false,
          stacking: 'normal',
          events: {
            legendItemClick: function (e) {
              e.preventDefault();
            },
          },
          borderWidth: 0,
          dataLabels: {
            style: {
              fontSize: '0.7rem',
            },
          },
        },
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        floating: true,
        borderWidth: 0,
        shadow: false,
        itemStyle: {
          fontSize: '0.7rem',
        },
      },
      credits: {
        enabled: false,
      },
      series: [],
      tooltip: {
        style: {
          fontSize: '0.8rem',
        },
      },
      responsive: {
        rules: [
          {
            chartOptions: {
              xAxis: {
                labels: {
                  style: {
                    fontSize: '0.9rem',
                    width: 250,
                  },
                },
              },
              yAxis: {
                labels: {
                  style: {
                    fontSize: '0.9rem',
                  },
                },
              },
              tooltip: {
                style: {
                  fontSize: '1rem',
                },
              },
              legend: {
                itemStyle: {
                  fontSize: '1rem',
                },
              },
            },
            condition: {
              callback: function () {
                return window.innerWidth >= 1920 && window.innerWidth < 2048;
              },
              minWidth: 1920,
              maxWidth: 2048,
            },
          },
          {
            chartOptions: {
              xAxis: {
                labels: {
                  style: {
                    fontSize: '1rem',
                    width: 300,
                  },
                },
              },
              yAxis: {
                labels: {
                  style: {
                    fontSize: '1rem',
                  },
                },
              },
              tooltip: {
                style: {
                  fontSize: '1.5rem',
                },
              },
              legend: {
                itemStyle: {
                  fontSize: '1.2rem',
                },
              },
            },
            condition: {
              callback: function () {
                return window.innerWidth >= 2048 && window.innerWidth < 2560;
              },
              minWidth: 2048,
              maxWidth: 2560,
            },
          },
          {
            chartOptions: {
              chart: {
                events: {
                  load: function (this: any) {
                    let categoryHeight = 20;
                    this.update({
                      chart: {
                        height:
                          categoryHeight * this.pointCount +
                          (this.chartHeight - this.plotHeight),
                      },
                    });
                  },
                },
              },
              xAxis: {
                labels: {
                  style: {
                    fontSize: '1.2rem',
                    width: 400,
                  },
                },
              },
              yAxis: {
                labels: {
                  style: {
                    fontSize: '1.2rem',
                  },
                },
              },
              tooltip: {
                style: {
                  fontSize: '2rem',
                },
              },
              legend: {
                itemStyle: {
                  fontSize: '1.5rem',
                },
              },
            },
            condition: {
              callback: function () {
                return window.innerWidth >= 2560 && window.innerWidth < 3840;
              },
              minWidth: 2560,
              maxWidth: 3840,
            },
          },
          {
            chartOptions: {
              chart: {
                marginTop: 80,
                events: {
                  load: function (this: any) {
                    let categoryHeight = 30;
                    this.update({
                      chart: {
                        height:
                          categoryHeight * this.pointCount +
                          (this.chartHeight - this.plotHeight),
                      },
                    });
                  },
                },
              },
              xAxis: {
                labels: {
                  style: {
                    fontSize: '1.8rem',
                    width: 400,
                  },
                },
              },
              yAxis: {
                labels: {
                  style: {
                    fontSize: '1.8rem',
                  },
                },
              },
              tooltip: {
                style: {
                  fontSize: '2.5rem',
                },
              },
              legend: {
                itemStyle: {
                  fontSize: '2rem',
                },
              },
            },
            condition: {
              callback: function () {
                return window.innerWidth >= 3840;
              },
              minWidth: 3840,
            },
          },
        ],
      },
    };
    this.chart = Highcharts.chart(
      this.container.nativeElement,
      Highcharts.merge(defaultOptions, options),
      function (this: any) {}
    );
  }
}
