import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryOfertasComponent } from './query-ofertas.component';

describe('QueryOfertasComponent', () => {
  let component: QueryOfertasComponent;
  let fixture: ComponentFixture<QueryOfertasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryOfertasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryOfertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
