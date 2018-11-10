import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarBebidaComponent } from './agregar-bebida.component';

describe('AgregarBebidaComponent', () => {
  let component: AgregarBebidaComponent;
  let fixture: ComponentFixture<AgregarBebidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarBebidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarBebidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
