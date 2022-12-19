import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EduOfficialReportComponent } from './edu-official-report.component';

describe('EduOfficialReportComponent', () => {
  let component: EduOfficialReportComponent;
  let fixture: ComponentFixture<EduOfficialReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EduOfficialReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EduOfficialReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
