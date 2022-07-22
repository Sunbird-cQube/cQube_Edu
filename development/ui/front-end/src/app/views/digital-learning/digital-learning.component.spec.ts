import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DigitalLearningComponent } from './digital-learning.component';



describe('DigitalLearningComponent', () => {
  let component: DigitalLearningComponent;
  let fixture: ComponentFixture<DigitalLearningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigitalLearningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DigitalLearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
