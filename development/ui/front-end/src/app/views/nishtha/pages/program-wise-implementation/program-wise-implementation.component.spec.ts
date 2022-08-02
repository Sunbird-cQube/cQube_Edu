import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramWiseImplementationComponent } from './program-wise-implementation.component';

describe('ProgramWiseImplementationComponent', () => {
  let component: ProgramWiseImplementationComponent;
  let fixture: ComponentFixture<ProgramWiseImplementationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramWiseImplementationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramWiseImplementationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
