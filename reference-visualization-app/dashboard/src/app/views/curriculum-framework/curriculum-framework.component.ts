import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config/config.service';

@Component({
  selector: 'app-curriculum-framework',
  templateUrl: './curriculum-framework.component.html',
  styleUrls: ['./curriculum-framework.component.scss']
})
export class CurriculumFrameworkComponent implements OnInit {
  NCFMetrics: any[] | undefined;
  tabIndex = 0;

  constructor(private readonly _configService: ConfigService) {
    this._configService.getVanityMetrics('ncf').subscribe(vanityMetricsRes => {
      this.NCFMetrics = vanityMetricsRes.result;
    });
  }

  ngOnInit(): void {
  }
  

  onTabChanged($event: any): void {
    this.tabIndex = $event.index;
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  }
}
