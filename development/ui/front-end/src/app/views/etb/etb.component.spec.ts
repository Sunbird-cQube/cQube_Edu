import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtbComponent } from './etb.component';

describe('EtbComponent', () => {
  let component: EtbComponent;
  let fixture: ComponentFixture<EtbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtbComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
