import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapMyIndiaComponent } from './map-my-india.component';

describe('MapMyIndiaComponent', () => {
  let component: MapMyIndiaComponent;
  let fixture: ComponentFixture<MapMyIndiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapMyIndiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapMyIndiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
