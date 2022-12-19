import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergizedTextbookUsageComponent } from './energized-textbook-usage.component';

describe('EnergizedTextbookUsageComponent', () => {
  let component: EnergizedTextbookUsageComponent;
  let fixture: ComponentFixture<EnergizedTextbookUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnergizedTextbookUsageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnergizedTextbookUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
