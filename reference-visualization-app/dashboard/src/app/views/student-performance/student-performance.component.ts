import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-performance',
  templateUrl: './student-performance.component.html',
  styleUrls: ['./student-performance.component.scss']
})
export class StudentPerformanceComponent implements OnInit {
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

}
