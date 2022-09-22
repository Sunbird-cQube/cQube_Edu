import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatHeatmapComponent } from './sat-heatmap.component';

describe('SatHeatmapComponent', () => {
  let component: SatHeatmapComponent;
  let fixture: ComponentFixture<SatHeatmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SatHeatmapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SatHeatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
