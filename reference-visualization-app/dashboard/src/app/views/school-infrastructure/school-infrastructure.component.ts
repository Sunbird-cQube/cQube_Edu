import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-school-infrastructure',
  templateUrl: './school-infrastructure.component.html',
  styleUrls: ['./school-infrastructure.component.scss']
})
export class SchoolInfrastructureComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onTabChanged($event: any): void {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
      console.log('resize');
    }, 100);
  }
  
}
