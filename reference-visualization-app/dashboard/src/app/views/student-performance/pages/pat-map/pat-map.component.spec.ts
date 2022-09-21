import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatMapComponent } from './pat-map.component';

describe('PatMapComponent', () => {
  let component: PatMapComponent;
  let fixture: ComponentFixture<PatMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
