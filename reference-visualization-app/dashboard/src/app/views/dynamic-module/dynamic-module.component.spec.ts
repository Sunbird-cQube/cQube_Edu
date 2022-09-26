import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicModuleComponent } from './dynamic-module.component';

describe('DynamicModuleComponent', () => {
  let component: DynamicModuleComponent;
  let fixture: ComponentFixture<DynamicModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
