import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchoolRegistryComponent } from './school-registry.component';



describe('SchoolRegistryComponent', () => {
  let component: SchoolRegistryComponent;
  let fixture: ComponentFixture<SchoolRegistryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolRegistryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
