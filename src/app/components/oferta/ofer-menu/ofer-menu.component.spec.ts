import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OferMenuComponent } from './ofer-menu.component';

describe('OferMenuComponent', () => {
  let component: OferMenuComponent;
  let fixture: ComponentFixture<OferMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OferMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OferMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
