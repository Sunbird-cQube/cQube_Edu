import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalPlaysPerCapitaComponent } from './total-plays-per-capita.component';

describe('TotalPlaysPerCapitaComponent', () => {
  let component: TotalPlaysPerCapitaComponent;
  let fixture: ComponentFixture<TotalPlaysPerCapitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalPlaysPerCapitaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalPlaysPerCapitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
