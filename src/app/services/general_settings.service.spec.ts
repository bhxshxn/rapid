import { TestBed } from '@angular/core/testing';

import { General_settingsService } from './general_settings.service';

describe('General_settingsService', () => {
   let service: General_settingsService;

   beforeEach(() => {
      TestBed.configureTestingModule({});
      service = TestBed.inject(General_settingsService);
   });

   it('should be created', () => {
      expect(service).toBeTruthy();
   });
});
