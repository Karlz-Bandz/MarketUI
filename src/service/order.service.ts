import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { OrderRequest } from '../model/order-request';
import { Order } from '../model/order';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private apiUrl = environment.orderApiUrl;

  constructor(private http: HttpClient) {}

  createOrder(orderRequest: OrderRequest) {
    return this.http.post<Order>(`${this.apiUrl}/order`, orderRequest);
  }
}