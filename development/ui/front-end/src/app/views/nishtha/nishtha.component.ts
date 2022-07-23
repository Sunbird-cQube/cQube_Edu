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
  
  constructor(private readonly _configService: ConfigService) {
    this._configService.getVanityMetrics('nishtha').subscribe(vanityMetricsRes => {
      this.nisithaMetrics = vanityMetricsRes.result;
    });
  }

  ngOnInit(): void {
    if(this.config == 'VSK'){
      this.NVSK = false;
    }
  }

  onTabChanged($event: any): void {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
      console.log('resize');
    }, 100);
  }
}
