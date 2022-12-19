import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-performance',
  templateUrl: './student-performance.component.html',
  styleUrls: ['./student-performance.component.scss']
})
export class StudentPerformanceComponent implements OnInit {
  loadTabs = false;
  tabIndex;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe((param: any) => {
      this.tabIndex = param.tab ? Number(param.tab) : 0;
    })
   }

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
