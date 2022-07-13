import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IDashboardMenu } from 'src/app/core/models/IDashboardCard';
import { ConfigService } from 'src/app/core/services/config/config.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashboardMenu: IDashboardMenu[] | undefined;

  constructor(private readonly _configService: ConfigService, private readonly _router: Router) {
    // this._configService.getDashboardMenu().subscribe(dashboardMenuResult => {
    //   this.dashboardMenu = dashboardMenuResult.result;
    //   console.log(this.dashboardMenu);
    // });

    this._configService.getDashboardMetrics().subscribe(dashboardMenuResult => {
      this.dashboardMenu = dashboardMenuResult.result;
      console.log(this.dashboardMenu);
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
