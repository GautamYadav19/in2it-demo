import { TestBed } from '@angular/core/testing';

import { SettingJsonService } from './setting-json.service';

describe('SettingJsonService', () => {
  let service: SettingJsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingJsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
