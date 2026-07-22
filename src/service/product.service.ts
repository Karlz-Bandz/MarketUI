import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { Product } from '../model/product';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = environment.productApiUrl;

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  getProductById(id: number) {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  createProduct(product: Product) {
    return this.http.post<Product>(`${this.apiUrl}/products`, product);
  }

  updateProduct(id: number, product: Product) {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, product);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.apiUrl}/products/${id}`);
  }

  getImage(id: number): Observable<Blob> {
    return this.http.get(
      `${this.apiUrl}/products/${id}/image`,
      { responseType: 'blob' }
    );
  }

  uploadProductImage(productId: number, file: File) {

    const formData = new FormData();

    formData.append("file", file);

    return this.http.post(
      `${this.apiUrl}/products/${productId}/image`,
      formData
    );
  }
}