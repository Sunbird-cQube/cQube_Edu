import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfraMapComponent } from './infra-map.component';

describe('InfraMapComponent', () => {
  let component: InfraMapComponent;
  let fixture: ComponentFixture<InfraMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfraMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfraMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
