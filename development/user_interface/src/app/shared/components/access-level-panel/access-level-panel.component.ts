import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { stateCodeConvert } from 'src/app/core/config/StateCodes';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-access-level-panel',
  templateUrl: './access-level-panel.component.html',
  styleUrls: ['./access-level-panel.component.scss']
})
export class AccessLevelPanelComponent implements OnInit, OnChanges {

  @Input() filters: any = [];
  @Input() reportName: any;

  @Output() hyperlinkClicked = new EventEmitter<any>();

  national: boolean = true;
  states: any = stateCodeConvert;
  stateName: string = this.states[environment.stateCode];
  links: any = [];

  constructor() { }

  ngOnInit(): void {
    if(environment.config !== 'national'){
      this.national = false;
    }
    this.createLinks(this.filters);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.createLinks(this.filters);
  }

  onClick(hierarchyLevel: any) {
    this.hyperlinkClicked.emit(hierarchyLevel);
  }

  createLinks(filters: any){
    this.links = []
    let hierarchyLevel = 1;
    filters?.forEach((filter:any) => {
      if(hierarchyLevel == filter.hierarchyLevel && filter.value){
        let selectedOption = filter.options.find((option:any) => {
          return option.value === filter.value
        })
        let t = {
          link: selectedOption.label,
          hierarchyLevel: hierarchyLevel
        }
        this.links.push(t)
        hierarchyLevel += 1;
      }
    });
  }
}
