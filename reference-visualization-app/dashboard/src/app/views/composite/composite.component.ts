import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-composite',
  templateUrl: './composite.component.html',
  styleUrls: ['./composite.component.scss']
})
export class CompositeComponent implements OnInit {
  tabIndex = 0;
  loadTabs = false;

  constructor() { }

  ngOnInit(): void {
  }

  onTabChanged($event: any): void {
    this.tabIndex = $event.index;
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
      console.log('resize');
    }, 100);
  }

  selected() {
    if (this.loadTabs) {
      let tempIndex = this.tabIndex;
      this.tabIndex = undefined;
      setTimeout(() => {
        this.tabIndex = tempIndex
      }, 500);
    } else {
      this.loadTabs = true;
    }
  }

}
