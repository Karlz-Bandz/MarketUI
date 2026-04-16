import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { OrderRequest } from '../model/order-request';
import { Order } from '../model/order';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private apiUrl = environment.orderApiUrl;

  constructor(private http: HttpClient) {}

  createOrder(orderRequest: OrderRequest): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/order`, orderRequest);
  }

  getAllClientOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/order`);
  }

  updateOrderStatus(orderId: number, status: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/order/` + orderId, {status: status});
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/order/all`);
  }
}