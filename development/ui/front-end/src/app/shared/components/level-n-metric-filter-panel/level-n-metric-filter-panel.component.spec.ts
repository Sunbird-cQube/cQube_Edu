import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelNMetricFilterPanelComponent } from './level-n-metric-filter-panel.component';

describe('LevelNMetricFilterPanelComponent', () => {
  let component: LevelNMetricFilterPanelComponent;
  let fixture: ComponentFixture<LevelNMetricFilterPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelNMetricFilterPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevelNMetricFilterPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
