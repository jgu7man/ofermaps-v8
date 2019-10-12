import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaTutorialComponent } from './empresa-tutorial.component';

describe('EmpresaTutorialComponent', () => {
  let component: EmpresaTutorialComponent;
  let fixture: ComponentFixture<EmpresaTutorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresaTutorialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
