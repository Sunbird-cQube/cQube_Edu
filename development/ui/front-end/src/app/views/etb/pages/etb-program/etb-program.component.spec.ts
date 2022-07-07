import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtbProgramComponent } from './etb-program.component';

describe('EtbProgramComponent', () => {
  let component: EtbProgramComponent;
  let fixture: ComponentFixture<EtbProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtbProgramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtbProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
