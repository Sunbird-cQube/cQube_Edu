import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatesStartedTableComponent } from './states-started-table.component';

describe('StatesStartedTableComponent', () => {
  let component: StatesStartedTableComponent;
  let fixture: ComponentFixture<StatesStartedTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatesStartedTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatesStartedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
