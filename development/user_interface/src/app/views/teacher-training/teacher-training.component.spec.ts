import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeacherTrainingComponent } from './teacher-training.component';

describe('NishthaComponent', () => {
  let component: TeacherTrainingComponent;
  let fixture: ComponentFixture<TeacherTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeacherTrainingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TeacherTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
