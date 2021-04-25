import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  url = 'https://localhost:44397/';
  api = 'api/Customers/';
  listCustomers: Customer[];

  constructor(private http: HttpClient) { }

  getCustomers(){
    this.http.get(this.url + this.api).toPromise().then((data:Customer[]) => {
      this.listCustomers = data;
    });
  }
}
