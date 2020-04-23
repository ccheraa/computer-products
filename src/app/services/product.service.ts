import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

import { Product } from '../classes/product.classe';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productForm: FormGroup;
  array = [];

  constructor(
    private http: HttpClient
  ) {
    this.getProducts().subscribe(
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

  // Méthode Récupérer un seul Produit......
  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${BASE_URL}/products/${id}`);
  }

  // Méthode pour Récupérer des Produits......
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${BASE_URL}/products`);
  }

  // Méthode Création d'un nouveaux Produit......
  createProduct(body: Product): Observable<Product> {
    return this.http.post<Product>(`${BASE_URL}/products/add`, body, {
      observe: 'body'
    });
  }

  // Méthode Supprimer un Produit......
  deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(`${BASE_URL}/products/${id}`);
  }

  // Méthode Modifier un Produit......
  updateProduct(id: string, body: Product): Observable<Product> {
    return this.http.put<Product>(`${BASE_URL}/products/${id}`, body, {
      observe: 'body'
    });
  }

  // Méthode Chercher un Produit......
  searchProducts(params: any = {}): Observable<Product[]> {
    const keys = Object.keys(params);
    const query = keys.length === 0
      ? ''
      : '?' + keys.map(key => key + '=' + params[key]).join('&');

    return this.http.get<Product[]>(`${BASE_URL}/products` + query);
  }

  // Méthode Télécharger un fichier...
  uploadImage(image) {
    const data = new FormData();
    data.append('image', image);
    return this.http.post(`${BASE_URL}/uploads`, data);
  }

  // Méthode Télécharger un fichier
  uploadPhoto(image) {
    const data = new FormData();
    data.append('file', image);
    return this.http.post(`${BASE_URL}/products/upload`, data);
  }
}
