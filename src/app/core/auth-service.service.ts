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
    localStorage.setItem(variableName, data);
  }
  clearStorage() {
    localStorage.clear();
  }
  login(payload:any){
    return this.http.post('https://dummyjson.com/auth/login',payload).pipe(map((res)=>{
      return res
    }))
  }
  reFreshToken(reFreshToken:any ){
    let authReq={
      refreshToken:reFreshToken,
      expiresInMins : 1
    }
    
    return this.http.post('https://dummyjson.com/auth/refresh',authReq)
  }
  getUserByAPi(){
    return this.http.get('https://dummyjson.com/auth/me')
  }
}
