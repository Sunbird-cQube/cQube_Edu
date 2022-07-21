import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-level-n-metric-filter-panel',
  templateUrl: './level-n-metric-filter-panel.component.html',
  styleUrls: ['./level-n-metric-filter-panel.component.scss']
})
export class LevelNMetricFilterPanelComponent implements OnInit {

  @Input() metricFilter: any;
  @Input() levels: any;

  @Output() selectMetricFilter: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectLevel: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
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
