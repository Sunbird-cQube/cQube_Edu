import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DigitalLearningCoverageComponent } from './digital-learning-coverage.component';


describe('DigitalLearningCoverageComponent', () => {
  let component: DigitalLearningCoverageComponent;
  let fixture: ComponentFixture<DigitalLearningCoverageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigitalLearningCoverageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DigitalLearningCoverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
