import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CSesAlertComponent } from './c-ses-alert.component';

describe('CSesAlertComponent', () => {
  let component: CSesAlertComponent;
  let fixture: ComponentFixture<CSesAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CSesAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CSesAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
