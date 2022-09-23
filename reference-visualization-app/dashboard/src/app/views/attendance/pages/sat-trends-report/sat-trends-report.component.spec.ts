import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatTrendsReportComponent } from './sat-trends-report.component';

describe('SatTrendsReportComponent', () => {
  let component: SatTrendsReportComponent;
  let fixture: ComponentFixture<SatTrendsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SatTrendsReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SatTrendsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
