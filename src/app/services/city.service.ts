import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import * as _ from 'lodash';
import { City } from '../classes/city.classe';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  array = [];

  constructor(
    private http: HttpClient
  ) {
    this.getCities().subscribe(
      (data) => {
        this.array = data.map(
          (list) => {
            return list;
          }
        );
      }
    );
  }

  getCityName($name) {
    if ($name == null) {
      return '';
    } else {
      return $name;
    }
  }

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(`${BASE_URL}/cities`);
  }

  // getCities(): Observable<Client[]> {
  //   return this.http.get<Client[]>(`${BASE_URL}/clients`);
  // }

}
