import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})
export class FilterPanelComponent implements OnInit {

  @Input() filters: any = [];
  config: string = environment.config
  NVSK: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
