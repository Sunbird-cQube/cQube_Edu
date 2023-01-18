import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSeriesFilterPanelComponent } from './time-series-filter-panel.component';

describe('TimeSeriesFilterPanelComponent', () => {
  let component: TimeSeriesFilterPanelComponent;
  let fixture: ComponentFixture<TimeSeriesFilterPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeSeriesFilterPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeSeriesFilterPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
