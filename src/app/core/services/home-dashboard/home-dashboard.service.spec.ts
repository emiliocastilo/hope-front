import { TestBed } from '@angular/core/testing';

import { HomeDashboardService } from './home-dashboard.service';

describe('HomeDashboardService', () => {
  let service: HomeDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
