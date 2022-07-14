import { Component, OnInit } from '@angular/core';
import { ETBService } from 'src/app/core/services/etb/etb.service';
import { NishthaService } from 'src/app/core/services/nishtha/nishtha.service';

@Component({
  selector: 'app-pgi',
  templateUrl: './pgi.component.html',
  styleUrls: ['./pgi.component.scss']
})
export class PGIComponent implements OnInit {

  pgiMetricsData: any;
  pgiStateData: any;
  pgiMetrics: any;
  tableData: any;
  columns: any[] = [];
  options: Highcharts.Options | undefined;

  constructor(private readonly _ETBService: ETBService, private readonly _configService: NishthaService) {
    let data:any = "PGI";
    this._configService.getNishthaVanityMetrics(data).subscribe(dashboardMenuResult => {
      this.pgiMetricsData = dashboardMenuResult.result[3]?.metrics;
    });
    // this.getPGIMetricsData();
    this.getPGIStateData();
    this.getStateWisePGICoverageData();
  }

  ngOnInit(): void {
  }

  onTabChanged($event: any): void {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
      console.log('resize');
    }, 100);
  }

  getStateWisePGICoverageData() {
    return this._ETBService.getStateWiseETBCoverageData().subscribe(res => {
      this.tableData = res.result.data;
      this.columns = res.result.columns;


      this.options = {
        title: {
          text: ""
        },
        yAxis: {
          title: {
            y: 60,
            text: 'Overall PGI Coverage'
          }
        },
        series: [{
          type: 'solidgauge',
          name: 'Speed',
          data: [60.6],
          innerRadius: '80%',
          dataLabels: {
            y: -20,
            format:
              '<div style="text-align:center">' +
              '<span style="font-size:25px">{y}%</span><br/>' +
              '</div>'
          },
          tooltip: {
            valueSuffix: ' %'
          }
        }]
      }
    });
  }

  getPGIMetricsData() {
    this.pgiMetricsData = [
      {
        "name": "States in Level I",
        "value": "0",
        "tooltip": "States in Level I- 0"
      },
      {
        "name": "States in Level II",
        "value": "5",
        "tooltip": "States in Level II"
      },
      {
        "name": "States in Grade I+",
        "value": "7",
        "tooltip": "States in Grade I+"
      },
      {
        "name": "States in Grade I",
        "value": "8",
        "tooltip": "States in Grade I"
      },
      {
        "name": "States in Grade II",
        "value": "8",
        "tooltip": "States in Grade II"
      },
      {
        "name": "States in Grade III",
        "value": "4",
        "tooltip": "States in Grade III"
      },
    ];
  }

  getPGIStateData() {
    this.pgiStateData = [
      {
        "Location": "Andaman And Nicobar",
        "Latitude": 11.66702557,
        "Longitude": 92.73598262,
        "perfomance": "Performance: 44.77"
      },
      {
        "Location": "Andhra Pradesh ",
        "Latitude": 14.7504291,
        "Longitude": 78.57002559,
        "perfomance": "Performance: 57.73"
      },
      {
        "Location": "Arunachal Pradesh",
        "Latitude": 28.2180,
        "Longitude": 94.7278,
        "perfomance": "Performance: 39.81"
      },
      {
        "Location": "Assam",
        "Latitude": 26.7499809,
        "Longitude": 93.21666744,
        "perfomance": "Performance: 55.87"
      },
      {
        "Location": "Bihar",
        "Latitude": 25.78541445,
        "Longitude": 87.4799727,
        "perfomance": "Performance: 50.22"
      },
      {
        "Location": "Chandigarh ",
        "Latitude": 30.71999697,
        "Longitude": 76.78000565,
        "perfomance": "Performance: 58.97"
      },
      {
        "Location": "Chhattisgarh ",
        "Latitude": 22.09042035,
        "Longitude": 82.15998734,
        "perfomance": "Performance: 47.15"
      },
      {
        "Location": "Delhi ",
        "Latitude": 28.7041,
        "Longitude": 77.1025,
        "perfomance": "Performance: 41.50"
      },
      {
        "Location": "Goa",
        "Latitude": 15.2993,
        "Longitude": 74.1240,
        "perfomance": "Performance: 43.26"
      },
      {
        "Location": "Haryana ",
        "Latitude": 29.0588,
        "Longitude": 76.0856,
        "perfomance": "Performance: 54.99"
      },
      {
        "Location": "Himachal Pradesh ",
        "Latitude": 31.10002545,
        "Longitude": 77.16659704,
        "perfomance": "Performance: 45.45"
      },
      {
        "Location": "Jammu And Kashmir",
        "Latitude": 33.2778,
        "Longitude": 75.3412,
        "perfomance": "Performance: 47.33"
      },
      {
        "Location": "Jharkhand",
        "Latitude": 23.80039349,
        "Longitude": 86.41998572,
        "perfomance": "Performance: 44.83"
      },
      {
        "Location": "Karnataka ",
        "Latitude": 15.3173,
        "Longitude": 75.7139,
        "perfomance": "Performance: 56.53"
      },
      {
        "Location": "Kerala",
        "Latitude": 8.900372741,
        "Longitude": 76.56999263,
        "perfomance": "Performance: 60.12"
      },
      {
        "Location": "Lakshadweep",
        "Latitude": 10.56257331,
        "Longitude": 72.63686717,
        "perfomance": "Performance: 54.67"
      },
      {
        "Location": "Madhya Pradesh",
        "Latitude": 22.9734,
        "Longitude": 78.6569,
        "perfomance": "Performance: 39.77"
      },
      {
        "Location": "Maharashtra",
        "Latitude": 19.7515,
        "Longitude": 75.7139,
        "perfomance": "Performance: 39.99"
      },
      {
        "Location": "Ladakh",
        "Latitude": 34.2268,
        "Longitude": 77.5619,
        "perfomance": "Performance: 48.16"
      },
      {
        "Location": "Manipur",
        "Latitude": 25.99997072,
        "Longitude": 94.95001705,
        "perfomance": "Performance: 49.97"
      },
      {
        "Location": "Meghalaya",
        "Latitude": 25.80000,
        "Longitude": 91.8800142,
        "perfomance": "Performance: 51.67"
      },
      {
        "Location": "Mizoram ",
        "Latitude": 23.71039899,
        "Longitude": 92.72001461,
        "perfomance": "Performance: 40.92"
      },
      {
        "Location": "Nagaland ",
        "Latitude": 25.6669979,
        "Longitude": 94.11657019,
        "perfomance": "Performance: 44.22"
      },
      {
        "Location": "Odisha ",
        "Latitude": 20.9517,
        "Longitude": 85.0985,
        "perfomance": "Performance: 44.85"
      },
      {
        "Location": "Puducherry ",
        "Latitude": 11.93499371,
        "Longitude": 79.83000037,
        "perfomance": "Performance: 48.20"
      },
      {
        "Location": "Punjab ",
        "Latitude": 31.51997398,
        "Longitude": 75.98000281,
        "perfomance": "Performance: 43.72"
      },
      {
        "Location": "Rajasthan",
        "Latitude": 26.44999921,
        "Longitude": 74.63998124,
        "perfomance": "Performance: 39.53"
      },
      {
        "Location": "Sikkim ",
        "Latitude": 27.3333303,
        "Longitude": 88.6166475,
        "perfomance": "Performance: 64.14"
      },
      {
        "Location": "Tamil Nadu",
        "Latitude": 12.92038576,
        "Longitude": 79.15004187,
        "perfomance": "Performance: 41.33"
      },
      {
        "Location": "Tripura",
        "Latitude": 23.83540428,
        "Longitude": 91.27999914,
        "perfomance": "Performance: 45.27"
      },
      {
        "Location": "Uttar Pradesh",
        "Latitude": 26.8467,
        "Longitude": 80.9462,
        "perfomance": "Performance: 48.59"
      },
      {
        "Location": "Uttarakhand",
        "Latitude": 30.32040895,
        "Longitude": 78.05000565,
        "perfomance": "Performance: 45.06"
      },
      {
        "Location": "West Bengal ",
        "Latitude": 22.58039044,
        "Longitude": 88.32994665,
        "perfomance": "Performance: 46.87"
      },
      {
        "Location": "Gujarat",
        "Latitude": 22.2587,
        "Longitude": 71.1924,
        "perfomance": "Performance: 45.24"
      },
      {
        "Location": "Telangana",
        "Latitude": 18.1124,
        "Longitude": 79.0193,
        "perfomance": "Performance: 53.61"
      }
    ];
  }


}
