import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { switchMap, take } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authSrv: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.authSrv.user$.pipe(
      take(1),
      switchMap((user) => {
        // if (!user) {
        //   return next.handle(request);
        // }
        const newReq: HttpRequest<any> = request.clone({
          headers: request.headers
            .set(
              'Authorization',
              'Bearer ' +
                'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY0NjgxNTg4NSwiZXhwIjoxNjQ3Njc5ODg1fQ.pMpzREiLSMg5RfrKKY5KWp-d594qTx5KPj8i_Fxuns-4hz9UA_3IW0sMqN6XaPLU3LvVhGM88Kh-CRNoi4W_qg'
            )
            .set('X-TENANT-ID', 'fe_0721a'),
        });

        return next.handle(newReq);
      })
    );
  }
}
