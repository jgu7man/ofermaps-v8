import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistMainComponent } from './regist-main.component';

describe('RegistMainComponent', () => {
  let component: RegistMainComponent;
  let fixture: ComponentFixture<RegistMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
