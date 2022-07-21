import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalLearningSessionsComponent } from './total-learning-sessions.component';

describe('TotalLearningSessionsComponent', () => {
  let component: TotalLearningSessionsComponent;
  let fixture: ComponentFixture<TotalLearningSessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalLearningSessionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalLearningSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
