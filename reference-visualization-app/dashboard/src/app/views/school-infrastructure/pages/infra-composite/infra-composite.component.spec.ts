import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfraCompositeComponent } from './infra-composite.component';

describe('InfraCompositeComponent', () => {
  let component: InfraCompositeComponent;
  let fixture: ComponentFixture<InfraCompositeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfraCompositeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfraCompositeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
