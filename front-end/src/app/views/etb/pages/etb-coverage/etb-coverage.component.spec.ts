import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtbCoverageComponent } from './etb-coverage.component';

describe('EtbCoverageComponent', () => {
  let component: EtbCoverageComponent;
  let fixture: ComponentFixture<EtbCoverageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtbCoverageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtbCoverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
