import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-energized-textbook-usage',
  templateUrl: './energized-textbook-usage.component.html',
  styleUrls: ['./energized-textbook-usage.component.scss']
})
export class EnergizedTextbookUsageComponent implements OnInit {

  tabIndex = 0;

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

}
