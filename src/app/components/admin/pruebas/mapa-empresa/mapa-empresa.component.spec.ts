import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistMapaEmpresaComponent } from './mapa-empresa.component';

describe('RegistMapaEmpresaComponent', () => {
  let component: RegistMapaEmpresaComponent;
  let fixture: ComponentFixture<RegistMapaEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistMapaEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistMapaEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
