import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeWiseBarAndPieComponent } from './grade-wise-bar-and-pie.component';

describe('GradeWiseBarAndPieComponent', () => {
  let component: GradeWiseBarAndPieComponent;
  let fixture: ComponentFixture<GradeWiseBarAndPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradeWiseBarAndPieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradeWiseBarAndPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
