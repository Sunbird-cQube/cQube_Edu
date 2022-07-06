import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Highcharts from "highcharts/highstock";

import { IStateWiseEnrollmentRec } from 'src/app/core/models/IStateWiseEnrollmentRec';
import { NishthaService } from 'src/app/core/services/nishtha/nishtha.service';
@Component({
  selector: 'app-nishitha-table',
  templateUrl: './nishitha-table.component.html',
  styleUrls: ['./nishitha-table.component.scss']
})
export class NishithaTableComponent implements OnInit {
  stateWiseEnrollmentData!: IStateWiseEnrollmentRec[];
  options: Highcharts.Options | undefined;
  height: number;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.height = window.innerHeight;
  }
  constructor(private readonly _activatedRoute: ActivatedRoute, private readonly _nishthaService: NishthaService) { 
    this.height = window.innerHeight; 
    // this._activatedRoute.params.subscribe(params => {
      let params:any ={
        "version": "1.0"
      }
      if (params['version']) {
        this._nishthaService.getStateWiseEnrollmentData(params['version']).subscribe(res => {
          this.options = {
            chart: {
              events: {
                load: function(this: any) {
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
              categories: res.result.map((record: IStateWiseEnrollmentRec) => {
                return record['State'];
              })
            },
            yAxis: {
              opposite: true
            },
            series: [{
              type: 'bar',
              name: 'Total Enrollments',
              data: res.result.map((record: IStateWiseEnrollmentRec) => record['Total Enrollments'])
            }, {
              type: 'bar',
              name: 'Total Certifications',
              data: res.result.map((record: IStateWiseEnrollmentRec) => record['Total Certifications'])
            }]
          };
          
          this.stateWiseEnrollmentData = res.result;
        });
      }
    
    // });
  }

  ngOnInit(): void {
   
  }

}
