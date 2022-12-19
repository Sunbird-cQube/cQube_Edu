import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatLoComponent } from './pat-lo.component';

describe('PatLoComponent', () => {
  let component: PatLoComponent;
  let fixture: ComponentFixture<PatLoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatLoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatLoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
