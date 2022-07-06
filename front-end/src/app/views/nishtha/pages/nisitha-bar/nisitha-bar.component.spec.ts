import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NisithaBarComponent } from './nisitha-bar.component';

describe('NisithaBarComponent', () => {
  let component: NisithaBarComponent;
  let fixture: ComponentFixture<NisithaBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NisithaBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NisithaBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
