import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevioEditComponent } from './previo-edit.component';

describe('PrevioEditComponent', () => {
  let component: PrevioEditComponent;
  let fixture: ComponentFixture<PrevioEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrevioEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevioEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
