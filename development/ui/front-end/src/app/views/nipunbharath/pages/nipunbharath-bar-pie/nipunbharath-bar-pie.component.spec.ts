import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NipunbharathBarPieComponent } from './nipunbharath-bar-pie.component';

describe('NipunbharathBarPieComponent', () => {
  let component: NipunbharathBarPieComponent;
  let fixture: ComponentFixture<NipunbharathBarPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NipunbharathBarPieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NipunbharathBarPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
