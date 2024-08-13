import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  IsBaseUrl = 'https://dummyjson.com';

  constructor(private http: HttpClient) {}

  getToken() {
    return localStorage.getItem('tkn');
  }
  setDataInLocalStorage(variableName: string, data: any) {
    localStorage.setItem(variableName, JSON.stringify(data));
  }
  clearStorage() {
    localStorage.clear();
  }
  login(payload: any) :Observable<any> {
    return  this.http.post(`${this.IsBaseUrl}/auth/login`, payload).pipe(
      map((res) => {
        return res;
      })
    );
  }
}
