import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSettingComponent } from './update-setting.component';

describe('UpdateSettingComponent', () => {
  let component: UpdateSettingComponent;
  let fixture: ComponentFixture<UpdateSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
