import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OferNavbarComponent } from './ofer-navbar.component';

describe('OferNavbarComponent', () => {
  let component: OferNavbarComponent;
  let fixture: ComponentFixture<OferNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OferNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OferNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
