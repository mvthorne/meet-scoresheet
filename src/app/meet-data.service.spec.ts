import { TestBed } from '@angular/core/testing';

import { MeetDataService } from './meet-data.service';

describe('MeetDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MeetDataService = TestBed.get(MeetDataService);
    expect(service).toBeTruthy();
  });
});
