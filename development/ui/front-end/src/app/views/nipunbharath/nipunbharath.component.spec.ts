import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NipunbharathComponent } from './nipunbharath.component';

describe('NipunbharathComponent', () => {
  let component: NipunbharathComponent;
  let fixture: ComponentFixture<NipunbharathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NipunbharathComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NipunbharathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
