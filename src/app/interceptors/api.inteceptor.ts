import {
  HttpHandlerFn,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { HttpInterceptorFn } from '@angular/common/http';

export const apiUriInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const modifiedReq = req.clone({
    url: `http://localhost:3000${req.url}`,
  });

  return next(modifiedReq);
};
