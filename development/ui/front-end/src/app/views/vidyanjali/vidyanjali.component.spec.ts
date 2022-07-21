import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VidyanjaliComponent } from './vidyanjali.component';

describe('VidyanjaliComponent', () => {
  let component: VidyanjaliComponent;
  let fixture: ComponentFixture<VidyanjaliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VidyanjaliComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VidyanjaliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
