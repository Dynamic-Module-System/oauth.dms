import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpService } from '../../service/http.service';
import { BussineDTO } from '../../models/bussineDTO'

@Injectable({
  providedIn: 'root'
})
export class BussineResolver implements Resolve<any> {
  constructor(private httpService: HttpService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.httpService.HttpGet("Bussine")
  }
}
