import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopEmailComponent } from './pop-email.component';

describe('PopEmailComponent', () => {
  let component: PopEmailComponent;
  let fixture: ComponentFixture<PopEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
