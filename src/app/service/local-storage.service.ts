import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private stateSubject = new BehaviorSubject<any>(null);
  public state$: Observable<any> = this.stateSubject.asObservable();

  constructor() { }

  GetState(): any {
    return this.stateSubject.getValue();
  }

  SetState(newState: any, timeOut: number): void {
    setTimeout(() => {
      this.stateSubject.next(newState);
    }, timeOut);
  }

  public GetTenant(): string {
    let domain = window.location.hostname.split('.')
    if(domain.length <= 1) return ""
    return domain[0]
  }

  public LocalGet<T>(key: string): T | null {
    const item = localStorage.getItem(key)
    if (!item) return null
    return item as T
  }

  public LocalSet(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value))
  }

  public LocalRemove(key: string): void {
    localStorage.removeItem(key)
  }

}
