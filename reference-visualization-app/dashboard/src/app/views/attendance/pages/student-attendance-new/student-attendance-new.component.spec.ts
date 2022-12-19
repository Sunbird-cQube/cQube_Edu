import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAttendanceNewComponent } from './student-attendance-new.component';

describe('StudentAttendanceNewComponent', () => {
  let component: StudentAttendanceNewComponent;
  let fixture: ComponentFixture<StudentAttendanceNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentAttendanceNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentAttendanceNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
