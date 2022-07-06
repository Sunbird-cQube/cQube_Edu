import { Component, HostListener, OnInit } from '@angular/core';
import * as Highcharts from "highcharts/highstock";
import { ActivatedRoute } from '@angular/router';

import { IStateWiseEnrollmentRec } from 'src/app/core/models/IStateWiseEnrollmentRec';
import { NishthaService } from 'src/app/core/services/nishtha/nishtha.service';

@Component({
  selector: 'app-nisitha-stacked-bar',
  templateUrl: './nisitha-stacked-bar.component.html',
  styleUrls: ['./nisitha-stacked-bar.component.scss']
})
export class NisithaStackedBarComponent implements OnInit {
  stateWiseEnrollmentData!: IStateWiseEnrollmentRec[];
  options: Highcharts.Options | undefined;
  height: any;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.height = window.innerHeight;
  }

  constructor(private readonly _nishthaService: NishthaService) { 

    let params: any = {
      "version": "1.0"
    }
    if (params['version']) {
      this._nishthaService.getStateWiseEnrollmentData(params['version']).subscribe(res => {
        console.log(res)
        this.options = {
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
            // categories: res.result.map((record: IStateWiseEnrollmentRec) => {
            //   return record['State'];
            // })
            categories: ['Kerala', 'Madhya Pradesh', 'Telangana', 'Andhra Pradesh ']
          },
          yAxis: {
            opposite: true
          },
          series: [{
           
            type: 'bar',
            color: "#bbdefb",
            name: 'Total Enrollments',
             data: [20, 30, 20, 50]
          },
            {
              
              type: 'bar',
              color: "#34e5eb",
              name: 'Total Certifications',
              data: [80, 70, 80, 50]
             
            } ]
        };
        
         this.stateWiseEnrollmentData = res.result;
      });
    }
  }

  ngOnInit(): void {
  }

}
