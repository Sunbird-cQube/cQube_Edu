import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBarChartSeries } from 'src/app/core/models/IBarChat';
import { IStateWiseEnrollmentRec } from 'src/app/core/models/IStateWiseEnrollmentRec';
import { NishthaService } from 'src/app/core/services/nishtha/nishtha.service';

@Component({
  selector: 'app-nishtha-program-detail',
  templateUrl: './nishtha-program-detail.component.html',
  styleUrls: ['./nishtha-program-detail.component.scss']
})
export class NishthaProgramDetailComponent implements OnInit {
  stateWiseEnrollmentData: IStateWiseEnrollmentRec[] | undefined;
  categories: string[] | undefined;
  series: IBarChartSeries<number>[] | undefined;
  height = 250;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.height = window.innerHeight;
  }

  constructor(private readonly _activatedRoute: ActivatedRoute, private readonly _nishthaService: NishthaService) {
    this.height = window.innerHeight;
    this._activatedRoute.params.subscribe(params => {
      if (params['version']) {
        this._nishthaService.getStateWiseEnrollmentData(params['version']).subscribe(res => {
          this.categories = res.result.map((record: IStateWiseEnrollmentRec) => {
            return record['State'];
          });
          this.series = [{
              type: 'bar',
              name: 'Total Enrollments',
              data: res.result.map((record: IStateWiseEnrollmentRec) => record['Total Enrollments'])
            }, {
              type: 'bar',
              name: 'Total Certifications',
              data: res.result.map((record: IStateWiseEnrollmentRec) => record['Total Certifications'])
            }
          ];
          this.stateWiseEnrollmentData = res.result;
        });
      }
    });
  }

  ngOnInit(): void {
  }

}
