import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackbarComponent } from './backbar.component';

describe('BackbarComponent', () => {
  let component: BackbarComponent;
  let fixture: ComponentFixture<BackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
