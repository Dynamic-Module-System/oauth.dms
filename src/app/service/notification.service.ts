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
export class NotificationService {

  constructor(private http: HttpClient) { }

  private notify(notify: any): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire(notify)
  }

  public success(message: string): void {
    this.notify({
      title: message,
      icon: 'success'
    })
  }

  public error(message: string): void {
    this.notify({
      title: message,
      icon: 'error'
    })
  }

  public warning(message: string): void {
    this.notify({
      title: message,
      icon: 'warning'
    })
  }

}
