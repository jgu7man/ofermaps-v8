import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistUbicacionComponent } from './ubicacion.component';

describe('RegistUbicacionComponent', () => {
  let component: RegistUbicacionComponent;
  let fixture: ComponentFixture<RegistUbicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistUbicacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistUbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
