import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroImprovementComponent } from './micro-improvement.component';

describe('MicroImprovementComponent', () => {
  let component: MicroImprovementComponent;
  let fixture: ComponentFixture<MicroImprovementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicroImprovementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MicroImprovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
