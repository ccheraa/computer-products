import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { Client } from '../classes/client.classe';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clientForm: FormGroup;
  input = [
    {
      type: 'text',
      label: 'name',
      icon: 'edit',
      error: 'This field is mandatory.'
    },
    {
      type: 'text',
      label: 'email',
      icon: 'email',
      error: 'Invalid email adress.'
    },
  ];
  option = {
    genderList: ['Male', 'Female', 'Other']
  };

  constructor(
    private http: HttpClient
  ) { }

  private listners = new Subject<any>();
  listen(): Observable<any> {
    return this.listners.asObservable();
  }

  filter(filterBy: string) {
    this.listners.next(filterBy);
  }

  // form: FormGroup = new FormGroup({
  //   $key: new FormControl(null),
  //   name: new FormControl('', Validators.required),
  //   email: new FormControl('', Validators.email),
  //   mobile: new FormControl('', [Validators.required, Validators.pattern(('[5-7]\\d{8}'))]),
  //   city: new FormControl(0),
  //   gender: new FormControl('1'),
  //   hireDate: new FormControl('', Validators.required),
  //   isPermanent: new FormControl(false),
  // });

  // initializeFormGroup() {
  //   this.form.setValue({
  //     $key: null,
  //     name: '',
  //     email: '',
  //     mobile: '',
  //     city: 0,
  //     gender: '1',
  //     hireDate: '',
  //     isPermanent: false,
  //   });
  // }

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
