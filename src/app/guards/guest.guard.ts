import { CanMatchFn, Route, UrlSegment } from '@angular/router';

// create me function GuestGuard
export const guestGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
): boolean => {
  return !!localStorage.getItem('user');
};
