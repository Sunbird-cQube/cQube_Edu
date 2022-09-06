import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessLevelPanelComponent } from './access-level-panel.component';

describe('AccessLevelPanelComponent', () => {
  let component: AccessLevelPanelComponent;
  let fixture: ComponentFixture<AccessLevelPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessLevelPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessLevelPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
