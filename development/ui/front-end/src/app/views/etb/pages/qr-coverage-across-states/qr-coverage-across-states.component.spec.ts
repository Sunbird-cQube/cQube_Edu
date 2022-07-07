import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QRCoverageAcrossStatesComponent } from './qr-coverage-across-states.component';

describe('QRCoverageAcrossStatesComponent', () => {
  let component: QRCoverageAcrossStatesComponent;
  let fixture: ComponentFixture<QRCoverageAcrossStatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QRCoverageAcrossStatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QRCoverageAcrossStatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
