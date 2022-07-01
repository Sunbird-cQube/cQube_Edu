import { Component, OnInit } from '@angular/core';
import { IDashboardMenu } from 'src/app/core/models/IDashboardCard';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  config = environment.config
  dashboardMenu: IDashboardMenu[] | undefined;

  constructor(private readonly _configService: ConfigService) {
    this._configService.getDashboardMenu().subscribe(dashboardMenuResult => {
      if(this.config == 'NVSK'){
        this.dashboardMenu = dashboardMenuResult.result[0];
      }
      else if(this.config == 'VSK'){
        this.dashboardMenu = dashboardMenuResult.result[1];
      }
      console.log(this.dashboardMenu)
    });
  }

  ngOnInit(): void {
  }

}
