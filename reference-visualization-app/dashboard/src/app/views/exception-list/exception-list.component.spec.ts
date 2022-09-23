import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExceptionListComponent } from './exception-list.component';

describe('ExceptionListComponent', () => {
  let component: ExceptionListComponent;
  let fixture: ComponentFixture<ExceptionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExceptionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExceptionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
