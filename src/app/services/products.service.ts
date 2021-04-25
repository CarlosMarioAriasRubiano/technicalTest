import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url = 'https://localhost:44397/';
  api = 'api/Products/';
  listProducts: Product[];
  
  constructor(private http: HttpClient) { }

  getProducts(){
    this.http.get(this.url + this.api).toPromise().then((data:Product[]) => {
      this.listProducts = data;
    });
  }
}
