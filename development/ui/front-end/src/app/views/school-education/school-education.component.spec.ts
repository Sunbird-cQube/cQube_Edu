import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolEducationComponent } from './school-education.component';

describe('PGIComponent', () => {
  let component: SchoolEducationComponent;
  let fixture: ComponentFixture<SchoolEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolEducationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
