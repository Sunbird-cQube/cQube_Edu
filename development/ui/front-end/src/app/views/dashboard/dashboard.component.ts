import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IDashboardMenu } from 'src/app/core/models/IDashboardCard';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { environment } from 'src/environments/environment';
import { DashboardMenu } from '../../core/config/nvsk/DashboardMenu';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashboardMenu: IDashboardMenu[] | any;
  isNvsk = environment.config.toLocaleLowerCase() === 'nvsk';
  constructor(private readonly _configService: ConfigService, private readonly _router: Router) {
    this._configService.getDashboardMetrics().subscribe(dashboardMenuResult => {
      if (this.isNvsk) {
        this.dashboardMenu = dashboardMenuResult.result.map((item: any) => {
          let itemConfig = (DashboardMenu as any)[item.programId];

          if (itemConfig) {
            return {
              ...itemConfig,
              ...item
            }
          }

          return;
        });

        return;
      }
      this.dashboardMenu = dashboardMenuResult.result;
    });
  }

  ngOnInit(): void {
  }

  onClickOfDashboardItem(cardInfo: IDashboardMenu | undefined): void {
    if (cardInfo) {
      this._router.navigate([cardInfo.navigationURL]);
    }
  }

}
