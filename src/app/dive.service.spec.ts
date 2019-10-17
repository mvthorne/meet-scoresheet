import { TestBed } from '@angular/core/testing';

import { DiveService } from './dive.service';

describe('DiveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiveService = TestBed.get(DiveService);
    expect(service).toBeTruthy();
  });
});
