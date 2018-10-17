import { TestBed, async, inject } from '@angular/core/testing';

import { ActivateRouteGuard } from './activate-route.guard';

describe('ActivateRouteGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActivateRouteGuard]
    });
  });

  it('should ...', inject([ActivateRouteGuard], (guard: ActivateRouteGuard) => {
    expect(guard).toBeTruthy();
  }));
});
