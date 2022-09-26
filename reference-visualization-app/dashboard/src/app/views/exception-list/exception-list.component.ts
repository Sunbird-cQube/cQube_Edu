import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exception-list',
  templateUrl: './exception-list.component.html',
  styleUrls: ['./exception-list.component.scss']
})
export class ExceptionListComponent implements OnInit {

  tabIndex = 0;

  constructor() { }

  ngOnInit(): void {
  }

  onTabChanged($event: any): void {
    console.log($event.index)
    this.tabIndex = $event.index;
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
      console.log('resize');
    }, 100);
  }

  selected() {

    let tempIndex = this.tabIndex;
    this.tabIndex = undefined;
    setTimeout(() => {
      this.tabIndex = tempIndex
    }, 200);
  }

}
