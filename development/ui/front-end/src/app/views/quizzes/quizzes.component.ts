import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.scss']
})
export class QuizzesComponent implements OnInit {

  quizzesMetricsData: any;
  quizzesStateData: any;

  constructor() {
    this.getQuizzesMetricsData()
   }

  ngOnInit(): void {
  }

  onTabChanged($event: any): void {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
      console.log('resize');
    }, 100);
  }

  getQuizzesMetricsData() {
    this.quizzesMetricsData = [
      // {
      //     "name": "Total ",
      //     "value": "248",
      //     "tooltip": "Total District Participated"
      // }
  ];
  }

}
