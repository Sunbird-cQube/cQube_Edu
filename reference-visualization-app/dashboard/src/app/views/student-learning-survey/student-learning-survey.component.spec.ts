import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentLearningSurveyComponent } from './student-learning-survey.component';

describe('NasComponent', () => {
  let component: StudentLearningSurveyComponent;
  let fixture: ComponentFixture<StudentLearningSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentLearningSurveyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentLearningSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
