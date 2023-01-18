import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-time-series-filter-panel',
  templateUrl: './time-series-filter-panel.component.html',
  styleUrls: ['./time-series-filter-panel.component.scss']
})
export class TimeSeriesFilterPanelComponent implements OnInit {

  @Output() timeSeriesUpdated = new EventEmitter<any>();
  @Input() minDate: any;
  @Input() maxDate: any;

  constructor() { }

  selected: any;

  ngOnInit(): void {
  }

  changeDate(event: any) {
    this.timeSeriesUpdated.emit(this.selected)
  }
}
