import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadQrcodeComponent } from './read-qrcode.component';

describe('ReadQrcodeComponent', () => {
  let component: ReadQrcodeComponent;
  let fixture: ComponentFixture<ReadQrcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadQrcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadQrcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
