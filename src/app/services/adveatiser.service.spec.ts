import { TestBed } from '@angular/core/testing';

import { AdveatiserService } from './adveatiser.service';

describe('AdveatiserService', () => {
  let service: AdveatiserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdveatiserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
