import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DigitalLearningProgramComponent } from './digital-learning-program.component';


describe('DigitalLearningProgramComponent', () => {
  let component: DigitalLearningProgramComponent;
  let fixture: ComponentFixture<DigitalLearningProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigitalLearningProgramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DigitalLearningProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
