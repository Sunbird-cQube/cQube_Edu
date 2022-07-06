import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})
export class FilterPanelComponent implements OnInit {

  config: string = environment.config
  NVSK: boolean = true;

  constructor() { }

  ngOnInit(): void {
    if(this.config == 'VSK'){
      this.NVSK = false;
    }
  }

}
