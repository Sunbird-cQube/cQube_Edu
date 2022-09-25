import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextBookComponent } from './text-book.component';

describe('TextBookComponent', () => {
  let component: TextBookComponent;
  let fixture: ComponentFixture<TextBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextBookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
