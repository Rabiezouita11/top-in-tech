import { TestBed } from '@angular/core/testing';

import { GuardloginGuard } from './guardlogin.guard';

describe('GuardloginGuard', () => {
  let guard: GuardloginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardloginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
