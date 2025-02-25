import { TestBed } from '@angular/core/testing';

import { UserStoregeService } from './user-storege.service';

describe('UserStoregeService', () => {
  let service: UserStoregeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserStoregeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
