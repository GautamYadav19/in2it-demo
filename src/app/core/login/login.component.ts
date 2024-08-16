import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private _auth: AuthServiceService, private route: Router) {}

  ngOnInit(): void {}
  isLogin = true;
  username = 'emilys';
  password = 'emilyspass';
  expiresInMins = 1;
  onSubmit() {
    if (this.isLogin) {
      this._auth
      .login({
        username: this.username,
        password: this.password,
        expiresInMins: this.expiresInMins,
      })
      .subscribe({
        next: (data: any) => {
          const token = {
            token: data.token,
            refreshToken: data.refreshToken,
          };

          if (data.token) {
            this._auth.setDataInLocalStorage(
              'userData',
              JSON.stringify(data)
            );
            this._auth.setDataInLocalStorage('tkn', JSON.stringify(token));
            this.route.navigate(['/product']);
          }
        },
        error: (e) => {},
      });
    }
    else{
      // right now have no api for sign-up
    }
  }

  toggleForm() {
    this.isLogin = !this.isLogin;
    if (!this.isLogin) {
      this.username = '';
      this.password = '';
    }
  }
}
