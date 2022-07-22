import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevelopmentGoalBarComponent } from './development-goal-bar.component';

describe('DevelopmentGoalBarComponent', () => {
  let component: DevelopmentGoalBarComponent;
  let fixture: ComponentFixture<DevelopmentGoalBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevelopmentGoalBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevelopmentGoalBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
