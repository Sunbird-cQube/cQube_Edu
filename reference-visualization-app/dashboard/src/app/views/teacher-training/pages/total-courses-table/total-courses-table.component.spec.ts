import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalCoursesTableComponent } from './total-courses-table.component';

describe('TotalCoursesTableComponent', () => {
  let component: TotalCoursesTableComponent;
  let fixture: ComponentFixture<TotalCoursesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalCoursesTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalCoursesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
