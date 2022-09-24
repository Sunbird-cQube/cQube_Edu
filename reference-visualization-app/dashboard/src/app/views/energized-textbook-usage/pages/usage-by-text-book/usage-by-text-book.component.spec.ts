import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsageByTextBookComponent } from './usage-by-text-book.component';

describe('UsageByTextBookComponent', () => {
  let component: UsageByTextBookComponent;
  let fixture: ComponentFixture<UsageByTextBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsageByTextBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsageByTextBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
