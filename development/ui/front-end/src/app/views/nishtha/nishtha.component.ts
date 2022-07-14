import { Component, OnInit } from '@angular/core';
import { IDashboardMenu } from 'src/app/core/models/IDashboardCard';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { NishthaService } from 'src/app/core/services/nishtha/nishtha.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nishtha',
  templateUrl: './nishtha.component.html',
  styleUrls: ['./nishtha.component.scss']
})
export class NishthaComponent implements OnInit {

  config: string = environment.config
  NVSK: boolean = true;
  NisithaMetrics:any;
  nishithaVersion:any=[];
  val: any =[];
  version: String = '';
  
  constructor(private readonly _configService: NishthaService) {
    let data:any = "Nishtha";
    this._configService.getNishthaVanityMetrics(data).subscribe(dashboardMenuResult => {
      this.NisithaMetrics = dashboardMenuResult.result[0]?.metrics;
    });
  }

  ngOnInit(): void {
    if(this.config == 'VSK'){
      this.NVSK = false;
    }
    // this.NisithaMetrics = [
    //   {
    //     "name": "Total States Participating ",
    //     "value": "37 ",
    //     "tooltip": "Total States participating"
    //   },
    //   {
    //     "name": "Total Courses Launched",
    //     "value": "53.4 %",
    //     "tooltip": "Total Courses Launched"
    //   },
    //   {
    //     "name": "Total Languages",
    //     "value": " ",
    //     "tooltip": "Total Languages"
    //   },
    //   {
    //     "name": "Total Enrollment",
    //     "value": "3.2 Cr",
    //     "tooltip": "Total Enrollments"
    //   },
    //   {
    //     "name": "Total Completion",
    //     "value": "2.5 Cr",
    //     "tooltip": "Total Completion"
    //   },
    //   {
    //     "name": "Total Certification",
    //     "value": "2.2 Cr",
    //     "tooltip": "Total Certification"
    //   }
    // ]
    this.nishithaVersion = [
      { key: "Nishitha 1.0", value: "Nishitha 1.0" },
      { key: "Nishitha 2.0", value: "Nishitha 2.0" },
      { key: "Nishitha 3.0", value: "Nishitha 3.0" },
    ];
  }

  onVersionSelect(){
    console.log('version', this.version)
  }

  onTabChanged($event: any): void {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
      console.log('resize');
    }, 100);
  }
}
