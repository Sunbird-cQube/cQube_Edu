import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})
export class FilterPanelComponent implements OnInit {

  @Input() filters: any = [];
  @Output() filtersUpdated = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelectOption(event: any, ind: number): void {
    this.filters = this.filters.map((filter: any, filterInd: number) => {
      if (filterInd > ind) {
        filter.options = [];
        filter.value = null;
      }

      return filter;
    });

    this.filtersUpdated.emit(this.filters);
  }

}
