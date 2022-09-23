import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsageByCourseContentComponent } from './usage-by-course-content.component';

describe('UsageByCourseContentComponent', () => {
  let component: UsageByCourseContentComponent;
  let fixture: ComponentFixture<UsageByCourseContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsageByCourseContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsageByCourseContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
