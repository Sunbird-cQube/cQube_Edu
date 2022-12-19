import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-other-digital-learning-metrics',
  templateUrl: './other-digital-learning-metrics.component.html',
  styleUrls: ['./other-digital-learning-metrics.component.scss']
})
export class OtherDigitalLearningMetricsComponent implements OnInit {

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
