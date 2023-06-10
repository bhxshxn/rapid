import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAdveatiserComponent } from './view-adveatiser.component';

describe('ViewAdveatiserComponent', () => {
  let component: ViewAdveatiserComponent;
  let fixture: ComponentFixture<ViewAdveatiserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAdveatiserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAdveatiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
