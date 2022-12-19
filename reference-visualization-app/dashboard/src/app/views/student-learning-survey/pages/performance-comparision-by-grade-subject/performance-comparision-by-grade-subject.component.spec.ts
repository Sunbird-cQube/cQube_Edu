import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceComparisionByGradeSubjectComponent } from './performance-comparision-by-grade-subject.component';

describe('PerformanceComparisionByGradeSubjectComponent', () => {
  let component: PerformanceComparisionByGradeSubjectComponent;
  let fixture: ComponentFixture<PerformanceComparisionByGradeSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformanceComparisionByGradeSubjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformanceComparisionByGradeSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
