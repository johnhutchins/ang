import { TestBed, inject } from '@angular/core/testing';

import { PageTrackerService } from './page-tracker.service';

describe('PageTrackerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageTrackerService]
    });
  });

  it('should be created', inject([PageTrackerService], (service: PageTrackerService) => {
    expect(service).toBeTruthy();
  }));
});
