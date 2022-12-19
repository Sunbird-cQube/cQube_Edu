import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { IDashboardMenu } from 'src/app/core/models/IDashboardCard';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss']
})
export class DashboardCardComponent implements OnInit {
  
  isTextWrapIssueFix: boolean  = false;
  @Input() cardInfo: IDashboardMenu | undefined;
  @Output() onClick: EventEmitter<IDashboardMenu | undefined> = new EventEmitter<IDashboardMenu | undefined>();
  constructor() { }

  //Listen when browser is zoomed and add effects to text overLapping issues.
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
   if(window.innerWidth <= 1615) {
      this.isTextWrapIssueFix = true;
   }
  }

  ngOnInit(): void {
    // onLoad with browser ZoomIn will add effects to text overLapping issues.
    this.onResize(event);
  }

  len(arr: any[]){
    return arr.length;
  }

}
