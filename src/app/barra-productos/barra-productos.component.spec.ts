import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraProductosComponent } from './barra-productos.component';

describe('BarraProductosComponent', () => {
  let component: BarraProductosComponent;
  let fixture: ComponentFixture<BarraProductosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarraProductosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarraProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
