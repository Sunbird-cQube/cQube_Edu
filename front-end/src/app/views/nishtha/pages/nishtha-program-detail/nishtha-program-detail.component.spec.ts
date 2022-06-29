import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NishthaProgramDetailComponent } from './nishtha-program-detail.component';

describe('NishthaProgramDetailComponent', () => {
  let component: NishthaProgramDetailComponent;
  let fixture: ComponentFixture<NishthaProgramDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NishthaProgramDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NishthaProgramDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
