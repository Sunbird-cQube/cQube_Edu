import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsagePerCapitaComponent } from './usage-per-capita.component';

describe('UsagePerCapitaComponent', () => {
  let component: UsagePerCapitaComponent;
  let fixture: ComponentFixture<UsagePerCapitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsagePerCapitaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsagePerCapitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
