import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DivingComponent } from './diving.component';

describe('DivingComponent', () => {
  let component: DivingComponent;
  let fixture: ComponentFixture<DivingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
