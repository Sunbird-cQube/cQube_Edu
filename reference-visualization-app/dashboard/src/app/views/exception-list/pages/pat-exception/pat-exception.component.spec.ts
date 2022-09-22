import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatExceptionComponent } from './pat-exception.component';

describe('PatExceptionComponent', () => {
  let component: PatExceptionComponent;
  let fixture: ComponentFixture<PatExceptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatExceptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatExceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
