import { Component, OnInit } from '@angular/core';

import { ConfigService } from 'src/app/core/services/config/config.service';
import { IDashboardMenu } from '../../models/IDashboardCard';
import { IMenuItem } from '../../models/IMenuItem';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  menu: IMenuItem[] | undefined;

  constructor(private readonly _configService: ConfigService) {
    this._configService.getDashboardMetrics(true).subscribe(menuResult => {
      this.menu = [];
      let menuToDisplay: IMenuItem | any = {};
      menuToDisplay.label = "Dashboard";
      menuToDisplay.path = "/dashboard";
      menuToDisplay.icon = 'dashboard.png';
      menuToDisplay.isSelected = true;
      menuToDisplay.basepath = "dasboard";
      this.menu.push(menuToDisplay);
      menuResult.result.forEach((dasboardMenu:IDashboardMenu)=>{
        let menuToDisplay: IMenuItem | any = {};
        menuToDisplay.label = dasboardMenu.title;
        menuToDisplay.path = dasboardMenu.navigationURL;
        menuToDisplay.icon = dasboardMenu.icon;
        menuToDisplay.isSelected = false;
        this.menu?.push(menuToDisplay);
      });
      //this.menu = menuResult.result;
    });
  }

  ngOnInit(): void {
  }

}
