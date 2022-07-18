import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nishtha',
  templateUrl: './nishtha.component.html',
  styleUrls: ['./nishtha.component.scss']
})
export class NishthaComponent implements OnInit {

  config: string = environment.config
  NVSK: boolean = true;
  nisithaMetrics: any;
  nishithaVersion: any=[];
  val: any =[];
  version: String = '';
  
  constructor(private readonly _configService: ConfigService) {
    this._configService.getVanityMetrics('nishtha').subscribe(vanityMetricsRes => {
      this.nisithaMetrics = vanityMetricsRes.result;
    });
  }

  ngOnInit(): void {
    if(this.config == 'VSK'){
      this.NVSK = false;
    }
    
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
