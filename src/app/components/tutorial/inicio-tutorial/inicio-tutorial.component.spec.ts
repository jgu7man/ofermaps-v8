import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioTutorialComponent } from './inicio-tutorial.component';

describe('InicioTutorialComponent', () => {
  let component: InicioTutorialComponent;
  let fixture: ComponentFixture<InicioTutorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioTutorialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
