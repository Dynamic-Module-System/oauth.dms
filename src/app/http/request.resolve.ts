import { Injectable } from "@angular/core";
import { RequestResult } from "../models/requestResult";
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificationService } from '../service/notification.service'

@Injectable({
  providedIn: 'root'
})
export class ResolveRequestResultService {

  constructor(private notification: NotificationService) {
    this.handleError = this.handleError.bind(this)
  }

  resolve<T>(requestResult: RequestResult<T>) {
    if(requestResult.isError) {
      this.notification.error(requestResult.errorMessage);
      throw new Error(requestResult.errorMessage);
    }

    if(!requestResult.isSuccess) {
      this.notification.warning(requestResult.errors[0]);
      throw new Error(requestResult.errors[0]);
    }

    return requestResult.result;
  }

  resolveWithLoading<T>(obs: Observable<RequestResult<T>>) {
    // this.sharedService.showLoader(true)
    return obs.pipe(map((response) => {
      // this.sharedService.showLoader(false)
      return this.resolve(response);
    }));
  }

  handleError(error: any) {
    // this.sharedService.showLoader(false)
    this.notification.error(error)
    return throwError(error);
  }

}
