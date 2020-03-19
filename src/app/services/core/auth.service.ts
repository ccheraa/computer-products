import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  submitSignUp(body: any) {
    return this.http.post<any>(`${BASE_URL}/users/signup`, body, {
      observe: 'body'
    });
  }

  submitSignIn(body: any) {
    return this.http.post<any>(`${BASE_URL}/users/signin`, body, {
      observe: 'body'
    });
  }

  getUserName() {
    return this.http.get<any>(`${BASE_URL}/users/username`, {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
