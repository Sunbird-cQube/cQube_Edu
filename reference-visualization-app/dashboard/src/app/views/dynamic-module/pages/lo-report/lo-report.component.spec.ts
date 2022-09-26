import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoReportComponent } from './lo-report.component';

describe('LoReportComponent', () => {
  let component: LoReportComponent;
  let fixture: ComponentFixture<LoReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
