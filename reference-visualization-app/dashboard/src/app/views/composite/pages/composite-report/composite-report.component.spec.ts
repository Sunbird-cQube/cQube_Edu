import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompositeReportComponent } from './composite-report.component';

describe('CompositeReportComponent', () => {
  let component: CompositeReportComponent;
  let fixture: ComponentFixture<CompositeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompositeReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompositeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
