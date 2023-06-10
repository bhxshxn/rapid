import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdveatiserComponent } from './edit-adveatiser.component';

describe('EditAdveatiserComponent', () => {
  let component: EditAdveatiserComponent;
  let fixture: ComponentFixture<EditAdveatiserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAdveatiserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdveatiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
