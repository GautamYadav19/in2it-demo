import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductApiResponse } from 'src/app/Interfaces/product-table.interface';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  getProductData() {
    return this.http.get<ProductApiResponse>('assets/product-data.json');
  }
}
