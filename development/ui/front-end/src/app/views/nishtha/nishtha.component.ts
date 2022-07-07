import { Component, OnInit } from '@angular/core';
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

   NisithaMetrics:any
  nishithaVersion:any=[]
  version: String = ''
  constructor(private readonly _nishthaService: NishthaService) {
         
   }

  ngOnInit(): void {
    if(this.config == 'VSK'){
      this.NVSK = false;
    }
    this.NisithaMetrics = [
      {
        "name": "Total States participating",
        "value": "61.1 %",
        "tooltip": "Total States participating"
      },
      {
        "name": "Total Courses Launched",
        "value": "53.4 %",
        "tooltip": "Total Courses Launched"
      },
      {
        "name": "Total Languages",
        "value": "42 %",
        "tooltip": "Total Languages"
      },
      {
        "name": "Total Enrollments",
        "value": "",
        "tooltip": "Total Enrollments"
      },
      {
        "name": "Total Certifications",
        "value": "",
        "tooltip": "Total Certifications"
      }
    ]
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
