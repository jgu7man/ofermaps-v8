import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ENavbarComponent } from './e-navbar.component';

describe('ENavbarComponent', () => {
  let component: ENavbarComponent;
  let fixture: ComponentFixture<ENavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ENavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ENavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
