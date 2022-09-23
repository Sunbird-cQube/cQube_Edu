import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsageByTextbookContentComponent } from './usage-by-textbook-content.component';

describe('UsageByTextbookContentComponent', () => {
  let component: UsageByTextbookContentComponent;
  let fixture: ComponentFixture<UsageByTextbookContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsageByTextbookContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsageByTextbookContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
