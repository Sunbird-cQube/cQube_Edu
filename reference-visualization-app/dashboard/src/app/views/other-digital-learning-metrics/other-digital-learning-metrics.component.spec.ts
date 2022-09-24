import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherDigitalLearningMetricsComponent } from './other-digital-learning-metrics.component';

describe('OtherDigitalLearningMetricsComponent', () => {
  let component: OtherDigitalLearningMetricsComponent;
  let fixture: ComponentFixture<OtherDigitalLearningMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherDigitalLearningMetricsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherDigitalLearningMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
