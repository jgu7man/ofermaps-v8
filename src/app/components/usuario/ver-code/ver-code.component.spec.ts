import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCodeComponent } from './ver-code.component';

describe('VerCodeComponent', () => {
  let component: VerCodeComponent;
  let fixture: ComponentFixture<VerCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
