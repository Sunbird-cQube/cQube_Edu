import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoTableComponent } from './lo-table.component';

describe('LoTableComponent', () => {
  let component: LoTableComponent;
  let fixture: ComponentFixture<LoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
