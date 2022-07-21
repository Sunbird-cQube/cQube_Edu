import { Component, OnInit } from '@angular/core';
import { NasService } from 'src/app/core/services/nas/nas.service';
@Component({
  selector: 'app-student-learning-survey-program',
  templateUrl: './student-learning-survey-program.component.html',
  styleUrls: ['./student-learning-survey-program.component.scss']
})
export class StudentLearningSurveyProgramComponent implements OnInit {
  tableData: any;
  columns: any[] = [];
  constructor(private readonly _NasService: NasService) {
    this.getStateWiseNasCoverageData()
  }

  ngOnInit(): void {
  }

  getStateWiseNasCoverageData() {
    return this._NasService.getNasStateData().subscribe((res:any) => {
      this.tableData = res.result.data;
      this.columns = res.result.columns;
    });
  }

}
