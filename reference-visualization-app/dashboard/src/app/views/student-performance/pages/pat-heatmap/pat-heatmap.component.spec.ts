import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatHeatmapComponent } from './pat-heatmap.component';

describe('PatHeatmapComponent', () => {
  let component: PatHeatmapComponent;
  let fixture: ComponentFixture<PatHeatmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatHeatmapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatHeatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
