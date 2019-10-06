import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegTarjetaComponent } from './reg-tarjeta.component';

describe('RegTarjetaComponent', () => {
  let component: RegTarjetaComponent;
  let fixture: ComponentFixture<RegTarjetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegTarjetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegTarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
