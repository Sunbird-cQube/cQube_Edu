import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateWiseParticipationComponent } from './state-wise-participation.component';

describe('StateWiseParticipationComponent', () => {
  let component: StateWiseParticipationComponent;
  let fixture: ComponentFixture<StateWiseParticipationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateWiseParticipationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StateWiseParticipationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
