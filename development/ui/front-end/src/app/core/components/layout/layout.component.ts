import { Component, OnInit } from '@angular/core';

import { ConfigService } from 'src/app/core/services/config/config.service';
import { IMenuItem } from '../../models/IMenuItem';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  menu: IMenuItem[] | undefined;

  constructor(private readonly _configService: ConfigService) {
    this._configService.getMenu().subscribe(menuResult => {
      this.menu = menuResult.result;
    });
  }

  ngOnInit(): void {
  }

}
