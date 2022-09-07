import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialButtonGroupComponent } from './material-button-group.component';

describe('MaterialButtonGroupComponent', () => {
  let component: MaterialButtonGroupComponent;
  let fixture: ComponentFixture<MaterialButtonGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialButtonGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialButtonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
