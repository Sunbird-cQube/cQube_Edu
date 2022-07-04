import { Component, Input, OnInit } from '@angular/core';
import { IDashboardMenu } from 'src/app/core/models/IDashboardCard';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss']
})
export class DashboardCardComponent implements OnInit {

  @Input() cardInfo: IDashboardMenu | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  len(arr: any[]){
    return arr.length
  }
}
