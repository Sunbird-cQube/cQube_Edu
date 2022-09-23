import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpsOfLearningComponent } from './gps-of-learning.component';

describe('GpsOfLearningComponent', () => {
  let component: GpsOfLearningComponent;
  let fixture: ComponentFixture<GpsOfLearningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GpsOfLearningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GpsOfLearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
