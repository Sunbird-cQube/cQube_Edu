import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelemetryReportComponent } from './telemetry-report.component';

describe('TelemetryReportComponent', () => {
  let component: TelemetryReportComponent;
  let fixture: ComponentFixture<TelemetryReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelemetryReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelemetryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
