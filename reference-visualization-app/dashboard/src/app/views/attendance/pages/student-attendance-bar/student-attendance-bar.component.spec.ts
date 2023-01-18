import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAttendanceBarComponent } from './student-attendance-bar.component';

describe('StudentAttendanceBarComponent', () => {
  let component: StudentAttendanceBarComponent;
  let fixture: ComponentFixture<StudentAttendanceBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentAttendanceBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentAttendanceBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
