import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationOfficialComponent } from './education-official.component';

describe('EducationOfficialComponent', () => {
  let component: EducationOfficialComponent;
  let fixture: ComponentFixture<EducationOfficialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationOfficialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducationOfficialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
