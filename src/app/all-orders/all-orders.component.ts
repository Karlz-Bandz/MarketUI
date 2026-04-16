import { Component } from '@angular/core';
import { Order } from '../../model/order';
import { OrderService } from '../../service/order.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.css'
})
export class AllOrdersComponent {
   orders!: Order[];
   statusFlag!: string;
  
    constructor(
      private orderService: OrderService
    ) {}
  
    ngOnInit(): void {
      this.getAllOrders();
    }

    updateOrderStatus(orderId: number, status: string) {
      this.orderService.updateOrderStatus(orderId, status).subscribe(() => {
        console.log('Update status ok');
      }, (err: any) => {
        alert('Update status error!');
        console.error('Change status error!');
      })
    }
  
    getAllOrders() {
      this.orderService.getAllOrders().subscribe((resp: Order[]) => {
        this.orders = resp;
      }, (err: any) => {
        console.error('Load all orders error!')
      });
    }
}
