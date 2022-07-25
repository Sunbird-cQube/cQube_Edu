import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-level-n-metric-filter-panel',
  templateUrl: './level-n-metric-filter-panel.component.html',
  styleUrls: ['./level-n-metric-filter-panel.component.scss']
})
export class LevelNMetricFilterPanelComponent implements OnInit {
  config: string = environment.config
  NVSK: boolean = true;

  @Input() metricFilter: any;
  @Input() levels: any;

  @Output() selectMetricFilter: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectLevel: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    if(this.config == 'VSK'){
      this.NVSK = false;
    }
  }

  onSelectMetricFilter(event: any): void {
    this.selectMetricFilter.emit(this.metricFilter);
  }

  onSelectLevel(event: any): void {
    event.items.forEach((level: any, levelInd: number) => {
        level.selected = levelInd === event.index;
    });

    this.selectLevel.emit(event);
  }

}
