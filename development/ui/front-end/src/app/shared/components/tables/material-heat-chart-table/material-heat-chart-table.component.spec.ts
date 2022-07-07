import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialHeatChartTableComponent } from './material-heat-chart-table.component';

describe('MaterialHeatChartTableComponent', () => {
  let component: MaterialHeatChartTableComponent;
  let fixture: ComponentFixture<MaterialHeatChartTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialHeatChartTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialHeatChartTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
