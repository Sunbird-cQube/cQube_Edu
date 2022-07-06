import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NishithaTableComponent } from './nishitha-table.component';

describe('NishithaTableComponent', () => {
  let component: NishithaTableComponent;
  let fixture: ComponentFixture<NishithaTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NishithaTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NishithaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
