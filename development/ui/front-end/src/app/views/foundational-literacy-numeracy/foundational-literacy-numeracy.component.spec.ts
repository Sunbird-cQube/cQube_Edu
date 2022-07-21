import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FoundationalLiteracyNumeracyComponent } from './foundational-literacy-numeracy.component';



describe('NipunbharathComponent', () => {
  let component: FoundationalLiteracyNumeracyComponent;
  let fixture: ComponentFixture<FoundationalLiteracyNumeracyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoundationalLiteracyNumeracyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoundationalLiteracyNumeracyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
