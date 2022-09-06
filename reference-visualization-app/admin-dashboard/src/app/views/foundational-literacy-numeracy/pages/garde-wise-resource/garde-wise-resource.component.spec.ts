import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GardeWiseResourceComponent } from './garde-wise-resource.component';

describe('GardeWiseResourceComponent', () => {
  let component: GardeWiseResourceComponent;
  let fixture: ComponentFixture<GardeWiseResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GardeWiseResourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GardeWiseResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
