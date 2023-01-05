import { TestBed } from '@angular/core/testing';

import { GuardAdminGuard } from './guard-admin.guard';

describe('GuardAdminGuard', () => {
  let guard: GuardAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
