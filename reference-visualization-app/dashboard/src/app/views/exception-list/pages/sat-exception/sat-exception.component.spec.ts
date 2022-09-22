import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatExceptionComponent } from './sat-exception.component';

describe('SatExceptionComponent', () => {
  let component: SatExceptionComponent;
  let fixture: ComponentFixture<SatExceptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SatExceptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SatExceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
