import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {

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

  switchToTrends() {
    this.tabIndex = 2;
  }

  switchToAttendance() {
    this.tabIndex = 0;
  }
  selected(){
    
    let tempIndex = this.tabIndex;
    this.tabIndex = undefined;
    setTimeout(() => {
      this.tabIndex = tempIndex
    }, 500);
  }

}
