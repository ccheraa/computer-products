import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import * as _ from 'lodash';
import { Category } from '../classes/category.classe';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  array = [];

  constructor(
    private http: HttpClient
  ) {
    this.getCategories().subscribe(
      (data) => {
        this.array = data.map(
          (list) => {
            return list;
          }
        );
      }
    );
  }

  getCategoryName($name) {
    if ($name == null) {
      return '';
    } else {
      return $name;
    }
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${BASE_URL}/categories`);
  }

}
