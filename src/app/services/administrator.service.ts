import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { Administrator } from '../classes/administrator.classe';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {

  constructor(
    private http: HttpClient
  ) { }

  // Méthode Récupérer un seul administrator
  getAdministrator(id: string): Observable<Administrator> {
    return this.http.get<Administrator>(`${BASE_URL}/administrators/${id}`);
  }

  // Méthode pour Récupérer des administrateurs
  getAdministrators(): Observable<Administrator[]> {
    return this.http.get<Administrator[]>(`${BASE_URL}/administrators`);
  }

  // Méthode Création d'un nouveaux administrateur
  createAdministrateur(body: Administrator): Observable<Administrator> {
    return this.http.post<Administrator>(`${BASE_URL}/administrators/add`, body, {
      observe: 'body'
    });
  }

  // Méthode Accès un administrateur
  userAuthorized(body: any) {
    return this.http.post<any>(`${BASE_URL}/administrators/authorized`, body, {
      observe: 'body'
    });
  }
}
