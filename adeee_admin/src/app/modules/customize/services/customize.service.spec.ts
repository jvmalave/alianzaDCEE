import { TestBed } from '@angular/core/testing';

import { CustomizeService } from './customize.service';

describe('ConfigService', () => {
  let service: CustomizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
