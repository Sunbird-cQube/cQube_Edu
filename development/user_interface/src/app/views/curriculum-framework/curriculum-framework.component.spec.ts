import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurriculumFrameworkComponent } from './curriculum-framework.component';



describe('NcfComponent', () => {
  let component: CurriculumFrameworkComponent;
  let fixture: ComponentFixture<CurriculumFrameworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurriculumFrameworkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurriculumFrameworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
