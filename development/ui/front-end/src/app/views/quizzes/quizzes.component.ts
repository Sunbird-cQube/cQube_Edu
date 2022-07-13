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
      {
          "name": "Total Quizzes",
          "value": "4",
          "tooltip": "Total Quizzes"
      },
      {
        "name": "Total Medium",
          "value": "2 ",
          "tooltip": "Total Medium"
      },
      {
        "name": "Total States Participating",
          "value": "34",
          "tooltip": "Total States Participating"
      },
      {
        "name": "Total Enrollment",
          "value": "18.3K ",
          "tooltip": "Total Enrollment"
      },
      {
        "name": "Total Certification",
          "value": "12.4K ",
          "tooltip": "Total Certification "
      }
  ];
  }

}
