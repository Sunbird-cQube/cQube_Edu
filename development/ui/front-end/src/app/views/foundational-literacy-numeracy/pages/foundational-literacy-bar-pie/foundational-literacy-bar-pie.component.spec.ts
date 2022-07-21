import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FoundationalLiteracyBarPieComponent } from './foundational-literacy-bar-pie.component';


describe('NipunbharathBarPieComponent', () => {
  let component: FoundationalLiteracyBarPieComponent;
  let fixture: ComponentFixture<FoundationalLiteracyBarPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoundationalLiteracyBarPieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoundationalLiteracyBarPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
