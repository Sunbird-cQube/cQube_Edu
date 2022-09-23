import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeartbeatOfTheNationLearningComponent } from './heartbeat-of-the-nation-learning.component';

describe('HeartbeatOfTheNationLearningComponent', () => {
  let component: HeartbeatOfTheNationLearningComponent;
  let fixture: ComponentFixture<HeartbeatOfTheNationLearningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeartbeatOfTheNationLearningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeartbeatOfTheNationLearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
