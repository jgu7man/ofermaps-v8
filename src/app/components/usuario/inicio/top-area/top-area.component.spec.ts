import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopAreaComponent } from './top-area.component';

describe('TopAreaComponent', () => {
  let component: TopAreaComponent;
  let fixture: ComponentFixture<TopAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
