import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentLearningSurveyProgramComponent } from './student-learning-survey-program.component';

describe('NasProgramComponent', () => {
  let component: StudentLearningSurveyProgramComponent;
  let fixture: ComponentFixture<StudentLearningSurveyProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentLearningSurveyProgramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentLearningSurveyProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
