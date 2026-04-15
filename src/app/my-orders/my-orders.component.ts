import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../service/order.service';
import { Order } from '../../model/order';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent implements OnInit {

  orders!: Order[];

  constructor(
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.getAllClientOrders();
  }

  getAllClientOrders() {
    this.orderService.getAllClientOrders().subscribe((resp: Order[]) => {
      this.orders = resp;
    }, (err: any) => {
      console.error('Load orders error!')
    });
  }
}
