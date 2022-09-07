import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolFacilitiesComparisionComponent } from './school-facilities-comparision.component';

describe('SchoolFacilitiesComparisionComponent', () => {
  let component: SchoolFacilitiesComparisionComponent;
  let fixture: ComponentFixture<SchoolFacilitiesComparisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolFacilitiesComparisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolFacilitiesComparisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
