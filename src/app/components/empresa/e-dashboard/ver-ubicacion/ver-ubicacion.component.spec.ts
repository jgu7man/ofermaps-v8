import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerUbicacionComponent } from './ver-ubicacion.component';

describe('VerUbicacionComponent', () => {
  let component: VerUbicacionComponent;
  let fixture: ComponentFixture<VerUbicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerUbicacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerUbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
