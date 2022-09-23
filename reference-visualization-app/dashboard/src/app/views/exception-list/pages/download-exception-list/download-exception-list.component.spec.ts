import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadExceptionListComponent } from './download-exception-list.component';

describe('DownloadExceptionListComponent', () => {
  let component: DownloadExceptionListComponent;
  let fixture: ComponentFixture<DownloadExceptionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadExceptionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadExceptionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
