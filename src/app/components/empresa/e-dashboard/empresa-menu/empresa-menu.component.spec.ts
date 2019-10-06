import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaMenuComponent } from './empresa-menu.component';

describe('EmpresaMenuComponent', () => {
  let component: EmpresaMenuComponent;
  let fixture: ComponentFixture<EmpresaMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresaMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
