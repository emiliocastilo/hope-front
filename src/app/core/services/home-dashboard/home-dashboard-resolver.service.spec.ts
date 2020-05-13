import { TestBed } from '@angular/core/testing';

import { HomeDashboardResolverService } from './home-dashboard-resolver.service';

describe('HomeDashboardResolverService', () => {
  let service: HomeDashboardResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeDashboardResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
