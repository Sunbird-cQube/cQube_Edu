import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NisithaStackedBarComponent } from './nisitha-stacked-bar.component';

describe('NisithaStackedBarComponent', () => {
  let component: NisithaStackedBarComponent;
  let fixture: ComponentFixture<NisithaStackedBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NisithaStackedBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NisithaStackedBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
