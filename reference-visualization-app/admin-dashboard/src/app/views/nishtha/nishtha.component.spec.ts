import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NishthaComponent } from './nishtha.component';

describe('NishthaComponent', () => {
  let component: NishthaComponent;
  let fixture: ComponentFixture<NishthaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NishthaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NishthaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
