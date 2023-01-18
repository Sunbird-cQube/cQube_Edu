import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAttendanceMapComponent } from './student-attendance-map.component';

describe('StudentAttendanceMapComponent', () => {
  let component: StudentAttendanceMapComponent;
  let fixture: ComponentFixture<StudentAttendanceMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentAttendanceMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentAttendanceMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
