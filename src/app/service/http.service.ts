import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from  '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { map, retry, catchError } from 'rxjs/operators'
import { environment } from '../../environments/environment'
import Swal from 'sweetalert2'
import { ResolveRequestResultService } from '../http/request.resolve'
import { RequestResult } from '../models/requestResult'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private resolver: ResolveRequestResultService,) {
    this.handleError = this.handleError.bind(this)
  }

  private setParams(params: any): any {
    let httpParams = new HttpParams()
    for (let key in params) {
      if (params.hasOwnProperty(key)) httpParams = httpParams.set(key, params[key])
    }
  }

  private handleError(error: any) {
    return throwError(error);
  }

  public HttpGet<T>(endPoint: string, params: any = null): Observable<T> {
    return this.http.get<RequestResult<T>>(`${environment.API_URL}${endPoint}`, { params: this.setParams(params) })
      .pipe(retry(0), catchError(this.handleError), map((response) => {
        //this.sharedService.showLoader(false)
        return this.resolver.resolve(response);
      }))
  }

  public HttpPost<T>(endPoint: string, data: any = null): Observable<T> {
    return this.http.post<RequestResult<T>>(`${environment.API_URL}${endPoint}`, data)
    .pipe(retry(0), catchError(this.handleError), map((response) => {
      //this.sharedService.showLoader(false)
      return this.resolver.resolve(response);
    }))
  }
}
