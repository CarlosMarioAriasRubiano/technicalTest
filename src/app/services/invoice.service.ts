import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from '../models/invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  url = 'https://localhost:44397/';
  api = 'api/Invoices/';
  listInvoice: Invoice[];

  constructor(private http: HttpClient) { }

  getInvoices(){
    this.http.get(this.url + this.api).toPromise().then((data:Invoice[]) => {
      this.listInvoice = data;
    });
  }

  saveInvoice(invoice: Invoice): Observable<Invoice>{
    return this.http.post<Invoice>(this.url + this.api, invoice);
  }

  deleteInvoice(id:number): Observable<Invoice>{
    return this.http.delete<Invoice>(this.url + this.api + id);
  }

}
