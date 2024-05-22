import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LocalStorageService } from '../../service/local-storage.service';
import { BussineDTO } from '../../models/bussineDTO'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class LocalStorageResolver implements Resolve<any> {
  constructor(private localService: LocalStorageService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {
   this.localService.LocalRemove(environment.KeyNit)
  }
}
