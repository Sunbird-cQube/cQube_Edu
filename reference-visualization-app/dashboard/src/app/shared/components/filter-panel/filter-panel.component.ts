import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})
export class FilterPanelComponent implements OnInit, OnChanges {

  @Input() filters: any = [];
  @Input() colSize: any = "md:col-span-3 xs:col-span-12 xmd:col-span-4 4k:col-span-2";
  @Input() resetOthers = false;

  @Output() filtersUpdated = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  onSelectOption(event: any, ind: number): void {
    if (this.resetOthers) {
      this.filters = this.filters.filter((filter: any, filterInd: number) => {
        if (filterInd > ind) {
          // filter.options = [];
          // filter.value = null;
          return false;
        }

        return true;
      });
    }

    this.filtersUpdated.emit(this.filters);
  }

  clearFilters(): void {
    this.filters = this.filters.map((filter: any) => {
      filter.value = null;
      return filter;
    });

    this.filtersUpdated.emit(this.filters);
  }

}
