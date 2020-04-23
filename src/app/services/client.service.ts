import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { Client, INPUT_CLIENT } from '../classes/client.classe';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clientForm: FormGroup;
  input = INPUT_CLIENT;
  option = {
    genderList: ['Male', 'Female', 'Other']
  };
  array = [];

  constructor(
    private http: HttpClient
  ) {
    this.getClients().subscribe(
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

  getClient(id: string): Observable<Client> {
    return this.http.get<Client>(`${BASE_URL}/clients/${id}`);
  }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${BASE_URL}/clients`);
  }

  createClient(body: Client): Observable<Client> {
    return this.http.post<Client>(`${BASE_URL}/clients/add`, body, {
      observe: 'body'
    });
  }

  updateClient(id: string, body: Client): Observable<Client> {
    return this.http.put<Client>(`${BASE_URL}/clients/${id}`, body, {
      observe: 'body'
    });
  }

  deleteClient(id: string): Observable<Client> {
    return this.http.delete<Client>(`${BASE_URL}/clients/${id}`);
  }

  searchClients(params: any = {}): Observable<Client[]> {
    const keys = Object.keys(params);
    const query = keys.length === 0
      ? ''
      : '?' + keys.map(key => key + '=' + params[key]).join('&');

    return this.http.get<Client[]>(`${BASE_URL}/clients` + query);
  }

}
