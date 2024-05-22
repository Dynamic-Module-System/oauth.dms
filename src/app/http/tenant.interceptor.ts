import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse  } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { LocalStorageService } from '../service/local-storage.service'
import { ResolveRequestResultService } from './request.resolve'
import { environment } from '../../environments/environment'

@Injectable()
export class TenantInterceptor implements HttpInterceptor {

  constructor(
    private resolver: ResolveRequestResultService,
    private localService: LocalStorageService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    this.localService.SetState({ Load: true }, 0)

    request = request.clone({
      setHeaders: {
        'Tenant': this.localService.GetTenant(),
        'Nit': this.localService.LocalGet<string>(environment.KeyNit) || ""
      }
    })

    /* return next.handle(request) */

    return next.handle(request)
      .pipe(
        map((res: any) => {
          this.localService.SetState({ Load: false }, 1000)
          return res
        }),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = ''
          if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`
          }
          else {
            errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`
          }
          this.localService.SetState({ Load: false }, 1000)
          return throwError(errorMessage)
        })
      )

  }
}
