import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EDashboardComponent } from './e-dashboard.component';

describe('EDashboardComponent', () => {
  let component: EDashboardComponent;
  let fixture: ComponentFixture<EDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
