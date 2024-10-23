import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  storageSub = new Subject<string>();
  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }
  constructor() {}
}
