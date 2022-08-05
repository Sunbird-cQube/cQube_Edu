import { Component, Input, OnChanges, OnInit, ViewChild, SimpleChanges, AfterViewInit } from '@angular/core';
import * as Highcharts from "highcharts/highstock";
import * as HighchartsMore from "highcharts/highcharts-more";
import { cloneDeep } from "lodash";

const HighchartsMore2: any = HighchartsMore;
HighchartsMore2(Highcharts);

@Component({
  selector: 'app-multi-bar-chart',
  templateUrl: './multi-bar-chart.component.html',
  styleUrls: ['./multi-bar-chart.component.scss']
})
export class MultiBarChartComponent implements OnInit, OnChanges, AfterViewInit {
  chart!: Highcharts.Chart;
  @Input() height: number | string = 'auto';
  @Input() title!: string;
  @Input() options: Highcharts.Options | undefined;

  defaultOptions: Highcharts.Options | undefined;
  series: Highcharts.SeriesOptionsType[] | undefined;
  pageSize = 100;
  totalRecords = 0;
  pageIndex = 0;

  @ViewChild('container') container: any;
  @ViewChild('left') left: any;
  @ViewChild('right') right: any;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.options !== undefined) {
      let pageSize = (this.options?.series as any)[0].data.length < this.pageSize ? (this.options?.series as any)[0].data.length : this.pageSize;
      
      setTimeout(() => {
        this.totalRecords = (this.options?.series as any)[0].data.length;
      });

      setTimeout(() => {
        this.series = cloneDeep(this.options?.series);
        (this.options as Highcharts.Options).series = this.options?.series?.map((series: any) => {
          series.data = series.data.slice(this.pageSize * this.pageIndex, this.pageSize * this.pageIndex + this.pageSize);
          return series;
        });
        this.createMultiBarChart(this.options);
      }, 100);
    }
  }

  onPageChange(event: any): void {
    let originalSeries = cloneDeep(this.series);
    this.pageSize = event.pageSize;
    (this.options as Highcharts.Options).series = originalSeries?.map((series: any) => {
      series.data = series.data.slice(this.pageSize * event.pageIndex, this.pageSize * event.pageIndex + this.pageSize);
      return series;
    });
    
    this.updateChart(this.options);
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100)
  }

  createMultiBarChart(options: Highcharts.Options | undefined): void {
    let ref: MultiBarChartComponent = this;
    let defaultOptions: Highcharts.Options = {
      chart: {
        type: 'bar',
        marginTop: 75
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
          formatter: function(this: any) {
            if (typeof this.value === 'number') {
              if (this.value < 1000) {
                return `${this.value}`;
              } else if (this.value > 999 && this.value <= 9999) {
                return `${this.value / 1000}K`;
              } else if (this.value > 9999 && this.value <= 9999999) {
                return `${this.value / 100000}L`;
              } else {
                return `${this.value / 10000000}Cr`;
              }
            }
            
            return `${this.axis.defaultLabelFormatter.call(this)}`;
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
            if (typeof this.value === 'number') {
              if (this.value < 1000) {
                return `${this.value}`;
              } else if (this.value > 999 && this.value <= 9999) {
                return `${this.value / 1000}K`;
              } else if (this.value > 9999 && this.value <= 9999999) {
                return `${this.value / 100000}L`;
              } else {
                return `${this.value / 10000000}Cr`;
              }
            }
            
            return `${this.axis.defaultLabelFormatter.call(this)}`;
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
                return new Intl.NumberFormat('en-IN').format(this.y);
              }
          },
          minPointLength: 10,
          pointPadding: 0.2
        },
        series: {
          events: {
            legendItemClick: function (e) {
              e.preventDefault();
            }
          },
          animation: false,
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
      tooltip: {
        shared: true,
        formatter: function (this: any) {
          return this.points.reduce(function (s: any, point: any) {
            return s + '<br/>' + point.series.name + ': ' + new Intl.NumberFormat('en-IN').format(point.y);
          }, '<b>' + this.x + '</b>');
        },
        enabled: true,
        style: {
          fontSize: '0.8rem'
        }
      },
      credits: {
        enabled: false
      },
      series: [],
      responsive: {
        rules: [
          {
            chartOptions: {
              chart: {
                events: {
                  load: function (this: any) {
                    let categoryHeight = 20;
                    this.update({
                      chart: {
                        height: categoryHeight * this.pointCount + (this.chartHeight - this.plotHeight)
                      }
                    })
                  }
                }
              },
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
              chart: {
                events: {
                  load: function (this: any) {
                    let categoryHeight = 30;
                    this.update({
                      chart: {
                        height: categoryHeight * this.pointCount + (this.chartHeight - this.plotHeight)
                      }
                    })
                  }
                }
              },
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
                events: {
                  load: function (this: any) {
                    let categoryHeight = 40;
                    this.update({
                      chart: {
                        height: categoryHeight * this.pointCount + (this.chartHeight - this.plotHeight)
                      }
                    })
                  }
                }
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
                marginTop: 80,
                events: {
                  load: function(this: any) {
                    let categoryHeight = 50;
                    this.update({
                      chart: {
                        height: categoryHeight * this.pointCount + (this.chartHeight - this.plotHeight)
                      }
                    })
                  }
                }
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
    this.defaultOptions = defaultOptions;
    this.chart = Highcharts.chart(this.container.nativeElement, Highcharts.merge(defaultOptions, options), function (this: any) {
    });
  }

  updateChart(options: any) {
    this.chart.update(Highcharts.merge(this.defaultOptions, options))
  }
}
