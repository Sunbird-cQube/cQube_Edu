import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonReportComponent } from './common-report.component';

describe('CommonReportComponent', () => {
  let component: CommonReportComponent;
  let fixture: ComponentFixture<CommonReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
