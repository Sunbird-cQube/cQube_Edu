import { Component, Input, OnChanges, OnInit, ViewChild, SimpleChanges, HostListener } from '@angular/core';
import * as Highcharts from "highcharts/highstock";
import * as HighchartsMore from "highcharts/highcharts-more";
import { formatNumberForReport, numberLabelFormatForReport } from 'src/app/utilities/NumberFomatter';

const HighchartsMore2: any = HighchartsMore;
HighchartsMore2(Highcharts);

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, OnChanges {
  chart!: Highcharts.Chart;
  @Input() height: number | string = 'auto';
  @Input() title!: string;
  @Input() options: Highcharts.Options | undefined;
  @Input() marginTop: any = 90;

  @ViewChild('container') container: any;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {

  // this.chart.redraw()
  const elFontSize = window.getComputedStyle(document.documentElement).getPropertyValue('font-size');
  
  const localFontSize = localStorage.getItem('fontSize');
  const currentFontSize = localFontSize ? localFontSize : elFontSize;
  this.chart.update(
    {
      chart: {
        // spacingBottom: 0,
        // spacingTop: Number(currentFontSize) + 80,
        marginTop: Number(currentFontSize) + Number(this.marginTop)
      },
      xAxis: {
        labels: {
          step: 1,
          style: {
            fontSize: currentFontSize
          }
        }
      },
      yAxis: {
        labels: {
          style: {
            fontSize: currentFontSize
          }
        }
      },
      tooltip: {
        style: {
          fontSize: currentFontSize
        }
      },
      legend: {
        itemStyle: {
          fontSize: currentFontSize
        }
      },
      plotOptions: {  
        series: {
          dataLabels: {
            style: {
              fontSize: currentFontSize
            }
          }
        }
      },
    }
  )
  }

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.options !== undefined) {
      setTimeout(() => {
        this.createMultiBarChart(this.options);
      }, 100);
    }
  }

  createMultiBarChart(options: Highcharts.Options | undefined): void {
    let ref: BarChartComponent = this;
    let defaultOptions: Highcharts.Options = {
      chart: {
        type: 'bar',
        marginTop: 80
      },
      title: {
          text: ""
      },
      xAxis: {
          categories: [],
          title: {
              text: null
          },
          scrollbar: {
            enabled: false
          },
          gridLineColor: 'transparent',
          labels: {
            step: 1,
            formatter: function(this: any) {
              return numberLabelFormatForReport(this.value, this);
            },
            style: {
              fontSize: '0.7rem'
            }
          }
      },
      yAxis: {
          min: 0,
          title: {
              text: null
          },
          gridLineColor: 'transparent',
          labels: {
            formatter: function(this: any) {
              return numberLabelFormatForReport(this.value, this);
            },
            style: {
              fontSize: '0.7rem'
            }
          }
      },
      plotOptions: {
        bar: {
          dataLabels: {
              enabled: true,
              crop: false,
              allowOverlap: true,
              formatter: function(this: any) {
                return formatNumberForReport(this.y);
              }
          },
          minPointLength: 0
        },
        series: {
          stickyTracking: false,
          events: {
            legendItemClick: function (e) {
              e.preventDefault();
            }
          },
          dataLabels: {
            style: {
              fontSize: '0.7rem'
            }
          }
        }
      },
      legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          floating: true,
          borderWidth: 0,
          shadow: false,
          itemStyle: {
            fontSize: '0.7rem'
          }
      },
      credits: {
          enabled: false
      },
      series: [],
      tooltip: {
        style: {
          fontSize: '0.8rem'
        },
        formatter: function(this: any) {
          return `${this.series.name}<br><span style="padding: 5px; background: ${this.color}"></span>${this.x}: ${new Intl.NumberFormat('en-IN').format(this.y)}`;
        }
      },
      responsive: {
        rules: [
          {
            chartOptions: {
              xAxis: {
                labels: {
                  style: {
                    fontSize: '0.9rem'
                  }
                }
              },
              yAxis: {
                labels: {
                  style: {
                    fontSize: '0.9rem'
                  }
                }
              },
              tooltip: {
                style: {
                  fontSize: '1rem'
                }
              },
              legend: {
                itemStyle: {
                  fontSize: '1rem'
                }
              },
              plotOptions: {
                series: {
                  dataLabels: {
                    style: {
                      fontSize: '0.9rem'
                    }
                  }
                }
              }
            },
            condition: {
              callback: function() {
                return window.innerWidth >= 1920 && window.innerWidth < 2048;
              },
              minWidth: 1920,
              maxWidth: 2048
            }
          },
          {
            chartOptions: {
              xAxis: {
                labels: {
                  style: {
                    fontSize: '1rem'
                  }
                }
              },
              yAxis: {
                labels: {
                  style: {
                    fontSize: '1rem'
                  }
                }
              },
              tooltip: {
                style: {
                  fontSize: '1.5rem'
                }
              },
              legend: {
                itemStyle: {
                  fontSize: '1.2rem'
                }
              },
              plotOptions: {
                series: {
                  dataLabels: {
                    style: {
                      fontSize: '1rem'
                    }
                  }
                }
              }
            },
            condition: {
              callback: function() {
                return window.innerWidth >= 2048 && window.innerWidth < 2560;
              },
              minWidth: 2048,
              maxWidth: 2560
            }
          },
          {
            chartOptions: {
              chart: {
                marginTop: Number(this.marginTop) + 60,
              },
              xAxis: {
                labels: {
                  style: {
                    fontSize: '1.2rem'
                  }
                }
              },
              yAxis: {
                labels: {
                  style: {
                    fontSize: '1.2rem'
                  }
                }
              },
              tooltip: {
                style: {
                  fontSize: '2rem'
                }
              },
              legend: {
                itemStyle: {
                  fontSize: '1.5rem'
                }
              },
              plotOptions: {
                series: {
                  dataLabels: {
                    style: {
                      fontSize: '1.5rem'
                    }
                  }
                }
              }
            },
            condition: {
              callback: function() {
                return window.innerWidth >= 2560 && window.innerWidth < 3840;
              },
              minWidth: 2560,
              maxWidth: 3840
            }
          },
          {
            chartOptions: {
              chart: {
                marginTop: Number(this.marginTop) + 120,
              },
              xAxis: {
                labels: {
                  style: {
                    fontSize: '1.8rem'
                  }
                }
              },
              yAxis: {
                labels: {
                  style: {
                    fontSize: '1.8rem'
                  }
                }
              },
              tooltip: {
                style: {
                  fontSize: '2.5rem'
                }
              },
              legend: {
                itemStyle: {
                  fontSize: '2rem'
                }
              },
              plotOptions: {  
                series: {
                  dataLabels: {
                    style: {
                      fontSize: '1.8rem'
                    }
                  }
                }
              }
            },
            condition: {
              callback: function() {
                return window.innerWidth >= 3840;
              },
              minWidth: 3840
            }
          }
        ]
      }
    };
    this.chart = Highcharts.chart(this.container.nativeElement, Highcharts.merge(defaultOptions, options), function(this: any) {
    });
  }
}
