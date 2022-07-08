import { Component, OnInit } from '@angular/core';
import * as Highcharts from "highcharts/highstock";
import { PieChartComponent } from 'src/app/shared/components/charts/pie-chart/pie-chart.component';

@Component({
  selector: 'app-nipunbharath-bar-pie',
  templateUrl: './nipunbharath-bar-pie.component.html',
  styleUrls: ['./nipunbharath-bar-pie.component.scss']
})
export class NipunbharathBarPieComponent implements OnInit {
  nipunBharathData: any

  constructor() { 
    this.getNipunBharathData();
  }

  ngOnInit(): void {
  }

  getNipunBharathData(): void {
    this.nipunBharathData = [
      {
        "Location": "Andaman And Nicobar",
        "Latitude": 11.66702557,
        "Longitude": 92.73598262,
        "perfomance": "Energised textbooks (State & NCERT adopted: Yes"
      },
      {
        "Location": "Andhra Pradesh ",
        "Latitude": 14.7504291,
        "Longitude": 78.57002559,
        "perfomance": "Energised textbooks (State & NCERT adopted: Yes"
      },
      {
        "Location": "Arunachal Pradesh",
        "Latitude": 28.2180,
        "Longitude": 94.7278,
        "perfomance": "Energised textbooks (State & NCERT adopted: Yes"
      },
      {
        "Location": "Assam ",
        "Latitude": 26.7499809,
        "Longitude": 93.21666744,
        "perfomance": "Energised textbooks (State & NCERT adopted: Yes"
      },
      {
        "Location": "Bihar ",
        "Latitude": 25.78541445,
        "Longitude": 87.4799727,
        "perfomance": "Energised textbooks (State & NCERT adopted: No"
      },
      {
        "Location": "Chandigarh ",
        "Latitude": 30.71999697,
        "Longitude": 76.78000565,
        "perfomance": "Energised textbooks (State & NCERT adopted: Yes"
      },
      {
        "Location": "Chhattisgarh ",
        "Latitude": 22.09042035,
        "Longitude": 82.15998734,
        "perfomance": "Energised textbooks (State & NCERT adopted: Yes"
      },
      {
        "Location": "Delhi ",
        "Latitude": 28.7041,
        "Longitude": 77.1025,
        "perfomance": "Energised textbooks (State & NCERT adopted: Yes"
      },
      {
        "Location": "Goa",
        "Latitude": 15.2993,
        "Longitude": 74.1240,
        "slug": "ga"
      },
      {
        "Location": "Haryana ",
        "Latitude": 29.0588,
        "Longitude": 76.0856,
        "perfomance": "Energised textbooks (State & NCERT adopted: Yes"
      },
      {
        "Location": "Himachal Pradesh ",
        "Latitude": 31.10002545,
        "Longitude": 77.16659704,
        "perfomance": "Energised textbooks (State & NCERT adopted: Yes"
      },
      {
        "Location": "Jammu And Kashmir",
        "Latitude": 33.2778,
        "Longitude": 75.3412,
        "perfomance": "Energised textbooks (State & NCERT adopted: Yes"
      },
      {
        "Location": "Jharkhand",
        "Latitude": 23.80039349,
        "Longitude": 86.41998572,
        "perfomance": "Energised textbooks (State & NCERT adopted: Yes"
      },
      {
        "Location": "Karnataka ",
        "Latitude": 15.3173,
        "Longitude": 75.7139,
        "perfomance": "Energised textbooks (State & NCERT adopted: Yes"
      },
      {
        "Location": "Kerala",
        "Latitude": 8.900372741,
        "Longitude": 76.56999263,
        "perfomance": "Energised textbooks (State & NCERT adopted: Yes"
      },
      {
        "Location": "Lakshadweep",
        "Latitude": 10.56257331,
        "Longitude": 72.63686717,
        "perfomance": "Energised textbooks (State & NCERT adopted: Yes"
      },
      {
        "Location": "Madhya Pradesh",
        "Latitude": 22.9734,
        "Longitude": 78.6569,
        "perfomance": "Energised textbooks (State & NCERT adopted: Yes"
      },
      {
        "Location": "Maharashtra",
        "Latitude": 19.7515,
        "Longitude": 75.7139,
        "perfomance": "Energised textbooks (State & NCERT adopted: Yes"
      },
      {
        "Location": "Ladakh",
        "Latitude": 34.2268,
        "Longitude": 77.5619,
        "perfomance": "Energised textbooks (State & NCERT adopted: Yes"
      },
      {
        "Location": "Manipur",
        "Latitude": 25.99997072,
        "Longitude": 94.95001705,
        "perfomance": "Energised textbooks (State & NCERT adopted: Yes"
      },
      {
        "Location": "Meghalaya",
        "Latitude": 25.80000,
        "Longitude": 91.8800142,
        "perfomance": "Energised textbooks (State & NCERT adopted: Yes"
      },
      {
        "Location": "Mizoram ",
        "Latitude": 23.71039899,
        "Longitude": 92.72001461,
        "perfomance": "Energised textbooks (State & NCERT adopted: Yes"
      },
      {
        "Location": "Nagaland ",
        "Latitude": 25.6669979,
        "Longitude": 94.11657019,
        "perfomance": "Energised textbooks (State & NCERT adopted: Yes"
      },
      {
        "Location": "Odisha ",
        "Latitude": 20.9517,
        "Longitude": 85.0985,
        "perfomance": "Energised textbooks (State & NCERT adopted: Yes"
      },
      {
        "Location": "Puducherry ",
        "Latitude": 11.93499371,
        "Longitude": 79.83000037,
        "perfomance": "Energised textbooks (State & NCERT adopted: Yes"
      },
      {
        "Location": "Punjab ",
        "Latitude": 31.51997398,
        "Longitude": 75.98000281,
        "perfomance": "Energised textbooks (State & NCERT adopted: Yes"
      },
      {
        "Location": "Rajasthan",
        "Latitude": 26.44999921,
        "Longitude": 74.63998124,
        "perfomance": "Energised textbooks (State & NCERT adopted: Yes"
      },
      {
        "Location": "Sikkim ",
        "Latitude": 27.3333303,
        "Longitude": 88.6166475,
        "perfomance": "Energised textbooks (State & NCERT adopted: Yes"
      },
      {
        "Location": "Tamil Nadu",
        "Latitude": 12.92038576,
        "Longitude": 79.15004187,
        "perfomance": "Energised textbooks (State & NCERT adopted: Yes"
      },
      {
        "Location": "Tripura",
        "Latitude": 23.83540428,
        "Longitude": 91.27999914,
        "perfomance": "Energised textbooks (State & NCERT adopted: Yes"
      },
      {
        "Location": "Uttar Pradesh",
        "Latitude": 26.8467,
        "Longitude": 80.9462,
        "perfomance": "Energised textbooks (State & NCERT adopted: Yes"
      },
      {
        "Location": "Uttarakhand",
        "Latitude": 30.32040895,
        "Longitude": 78.05000565,
        "perfomance": "Energised textbooks (State & NCERT adopted: Yes"
      },
      {
        "Location": "West Bengal ",
        "Latitude": 22.58039044,
        "Longitude": 88.32994665,
        "perfomance": "Energised textbooks (State & NCERT adopted: No"
      },
      {
        "Location": "Gujarat",
        "Latitude": 22.2587,
        "Longitude": 71.1924,
        "perfomance": "Energised textbooks (State & NCERT adopted: Yes"
      },
      {
        "Location": "Telangana",
        "Latitude": 18.1124,
        "Longitude": 79.0193,
        "perfomance": "Energised textbooks (State & NCERT adopted: Yes"
      }
    ];
  }


  

}
