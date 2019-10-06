import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TusOfertasComponent } from './tus-ofertas.component';

describe('TusOfertasComponent', () => {
  let component: TusOfertasComponent;
  let fixture: ComponentFixture<TusOfertasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TusOfertasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TusOfertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
