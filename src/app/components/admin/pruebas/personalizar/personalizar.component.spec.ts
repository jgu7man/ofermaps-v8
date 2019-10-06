import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistEmpresaComponent } from './personalizar.component';

describe('RegistEmpresaComponent', () => {
  let component: RegistEmpresaComponent;
  let fixture: ComponentFixture<RegistEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
