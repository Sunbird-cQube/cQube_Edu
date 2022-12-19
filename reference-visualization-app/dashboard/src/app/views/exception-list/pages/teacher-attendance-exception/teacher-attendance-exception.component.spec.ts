import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAttendanceExceptionComponent } from './teacher-attendance-exception.component';

describe('TeacherAttendanceExceptionComponent', () => {
  let component: TeacherAttendanceExceptionComponent;
  let fixture: ComponentFixture<TeacherAttendanceExceptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherAttendanceExceptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherAttendanceExceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
