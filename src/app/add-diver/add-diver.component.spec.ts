import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDiverComponent } from './add-diver.component';

describe('AddDiverComponent', () => {
  let component: AddDiverComponent;
  let fixture: ComponentFixture<AddDiverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDiverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
