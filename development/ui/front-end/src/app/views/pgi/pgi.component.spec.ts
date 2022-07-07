import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PGIComponent } from './pgi.component';

describe('PGIComponent', () => {
  let component: PGIComponent;
  let fixture: ComponentFixture<PGIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PGIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PGIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
