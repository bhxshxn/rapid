import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdveatiserComponent } from './create-adveatiser.component';

describe('CreateAdveatiserComponent', () => {
  let component: CreateAdveatiserComponent;
  let fixture: ComponentFixture<CreateAdveatiserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAdveatiserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAdveatiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
