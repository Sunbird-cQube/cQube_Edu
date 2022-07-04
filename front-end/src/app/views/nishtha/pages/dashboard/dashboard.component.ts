import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IDashboardMenu } from 'src/app/core/models/IDashboardCard';
import { NishthaService } from 'src/app/core/services/nishtha/nishtha.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  nishthaMenu: IDashboardMenu[] | undefined;

  constructor(private readonly _nishthaService: NishthaService, private readonly _router: Router) {
    this._nishthaService.getNishthaMenu().subscribe(nishthaMenuRes => {
      this.nishthaMenu = nishthaMenuRes.result;
    })
  }

  ngOnInit(): void {
  }

  onClickOfDashboardItem(cardInfo: IDashboardMenu | undefined): void {
    if (cardInfo) {
      this._router.navigate([cardInfo.navigationURL])
    }
  }

}
