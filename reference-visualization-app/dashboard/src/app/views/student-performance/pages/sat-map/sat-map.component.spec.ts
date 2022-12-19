import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatMapComponent } from './sat-map.component';

describe('SatMapComponent', () => {
  let component: SatMapComponent;
  let fixture: ComponentFixture<SatMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SatMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SatMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
