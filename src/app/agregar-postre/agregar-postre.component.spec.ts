import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPostreComponent } from './agregar-postre.component';

describe('AgregarPostreComponent', () => {
  let component: AgregarPostreComponent;
  let fixture: ComponentFixture<AgregarPostreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarPostreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarPostreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
