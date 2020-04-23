import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

import { User } from '../classes/user.classe';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userForm: FormGroup;
  array = [];
  option = {
    permissionList: ['authorized', 'unauthorized']
  };
  statusOn;
  statusOff = 'none';

  constructor(
    private http: HttpClient
  ) {
    this.getUsers().subscribe(
      (data) => {
        this.array = data.map(
          (list) => {
            return list;
          }
        );
      }
    );
  }

  private listners = new Subject<any>();
  listen(): Observable<any> {
    return this.listners.asObservable();
  }

  filter(filterBy: string) {
    this.listners.next(filterBy);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${BASE_URL}/users`);
  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(`${BASE_URL}/users/${id}`);
  }

  // Méthode Modifier un utilisateur
   updateUser(id: string, body: User): Observable<User> {
    return this.http.put<User>(`${BASE_URL}/users/${id}`, body, {
      observe: 'body'
    });
  }

  // Méthode Recherche d'utilisateurs
  searchUsers(params: any = {}): Observable<User[]> {
    const keys = Object.keys(params);
    const query = keys.length === 0
      ? ''
      : '?' + keys.map(key => key + '=' + params[key]).join('&');

    return this.http.get<User[]>(`${BASE_URL}/users` + query);
  }
}
