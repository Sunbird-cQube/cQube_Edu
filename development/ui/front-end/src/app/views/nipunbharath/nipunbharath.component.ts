import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nipunbharath',
  templateUrl: './nipunbharath.component.html',
  styleUrls: ['./nipunbharath.component.scss']
})
export class NipunbharathComponent implements OnInit {
  nipunBharathMetricsData: any;

  constructor() {
    this.getnipunBharathMetricsData();
   }

  ngOnInit(): void {
  }
  
  onTabChanged($event: any): void {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
      console.log('resize');
    }, 100);
  }    

  getnipunBharathMetricsData() {
    this.nipunBharathMetricsData = [
      {
          "name": "Total LOs covered",
          "value": "497",
          "tooltip": "Total LOs covered"
      },
      {
          "name": "Total Digital Books",
          "value": "18 ",
          "tooltip": "Total Digital Books"
      },
      {
        "name": "Total Content",
        "value": "1.3 K",
        "tooltip": "Total Content"
    },
    {
      "name": "Total Learning Sessions",
        "value": "1.2 L",
        "tooltip": "Total Learning Sessions"
    },
  ];
  }
}
