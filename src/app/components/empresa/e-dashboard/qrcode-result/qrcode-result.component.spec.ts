import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcodeResultComponent } from './qrcode-result.component';

describe('QrcodeResultComponent', () => {
  let component: QrcodeResultComponent;
  let fixture: ComponentFixture<QrcodeResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrcodeResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrcodeResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
