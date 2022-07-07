import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NasProgramComponent } from './nas-program.component';

describe('NasProgramComponent', () => {
  let component: NasProgramComponent;
  let fixture: ComponentFixture<NasProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NasProgramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NasProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
