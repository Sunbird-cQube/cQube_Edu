import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { environment } from 'src/environments/environment';
import { IMenuItem } from '../../models/IMenuItem';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  config = environment.config;

  menu: IMenuItem[] | undefined;

  constructor(private readonly _configService: ConfigService) {
    this._configService.getMenu().subscribe(menuResult => {
      if(this.config == 'NVSK'){
        this.menu = menuResult.result[0];
      }
      else if(this.config == 'VSK'){
        this.menu = menuResult.result[1];
      }
      console.log(this.menu)
    });
  }

  ngOnInit(): void {
  }

}
