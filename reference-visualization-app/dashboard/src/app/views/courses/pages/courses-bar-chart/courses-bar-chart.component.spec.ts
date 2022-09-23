import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesBarChartComponent } from './courses-bar-chart.component';

describe('CoursesBarChartComponent', () => {
  let component: CoursesBarChartComponent;
  let fixture: ComponentFixture<CoursesBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
