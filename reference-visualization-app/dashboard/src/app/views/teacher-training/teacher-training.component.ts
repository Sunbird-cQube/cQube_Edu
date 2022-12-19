import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-teacher-training',
  templateUrl: './teacher-training.component.html',
  styleUrls: ['./teacher-training.component.scss'],
})
export class TeacherTrainingComponent implements OnInit {
  config: string = environment.config;
  national: boolean = true;
  nisithaMetrics: any;
  tabIndex = 0;

  constructor(private readonly _configService: ConfigService) {
    this._configService
      .getVanityMetrics('nishtha')
      .subscribe((vanityMetricsRes) => {
        this.nisithaMetrics = vanityMetricsRes.result;
      });
  }

  ngOnInit(): void {
    if (this.config == 'state') {
      this.national = false;
    }
  }

  onTabChanged($event: any): void {
    this.tabIndex = $event.index;
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
      console.log('resize');
    }, 100);
  }
}
