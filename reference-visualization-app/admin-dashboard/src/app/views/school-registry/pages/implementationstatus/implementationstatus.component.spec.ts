import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImplementationstatusComponent } from './implementationstatus.component';

describe('ImplementationstatusComponent', () => {
  let component: ImplementationstatusComponent;
  let fixture: ComponentFixture<ImplementationstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImplementationstatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImplementationstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
