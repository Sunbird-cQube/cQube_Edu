import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NutritionHealthComponent } from './nutrition-health.component';

import { PmPoshanComponent } from './pm-poshan.component';

describe('PmPoshanComponent', () => {
  let component: NutritionHealthComponent
  let fixture: ComponentFixture<NutritionHealthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmPoshanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NutritionHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
