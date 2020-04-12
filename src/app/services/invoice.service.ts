import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { Invoice } from '../classes/invoice.classe';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(
    private http: HttpClient
  ) { }

  getInvoice(id: string): Observable<Invoice> {
    return this.http.get<Invoice>(`${BASE_URL}/invoices/${id}`);
  }

  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${BASE_URL}/invoices`);
  }

  createInvoice(body: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(`${BASE_URL}/invoices/add`, body, {
      observe: 'body'
    });
  }

  deleteInvoice(id: string): Observable<Invoice> {
    return this.http.delete<Invoice>(`${BASE_URL}/invoices/${id}`);
  }

  updateInvoice(id: string, body: Invoice) {
    return this.http.put<Invoice>(`${BASE_URL}/invoices/${id}`, body);
  }

  searchInvoices(params: any = {}): Observable<Invoice[]> {
    const keys = Object.keys(params);
    const query = keys.length === 0
      ? ''
      : '?' + keys.map(key => key + '=' + params[key]).join('&');

    return this.http.get<Invoice[]>(`${BASE_URL}/invoices` + query);
  }
}
