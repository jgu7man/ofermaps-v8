import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjustarBgComponent } from './ajustar-bg.component';

describe('AjustarBgComponent', () => {
  let component: AjustarBgComponent;
  let fixture: ComponentFixture<AjustarBgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjustarBgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjustarBgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
