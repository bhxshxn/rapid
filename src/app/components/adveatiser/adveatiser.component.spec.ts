import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdveatiserComponent } from './adveatiser.component';

describe('AdveatiserComponent', () => {
  let component: AdveatiserComponent;
  let fixture: ComponentFixture<AdveatiserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdveatiserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdveatiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
