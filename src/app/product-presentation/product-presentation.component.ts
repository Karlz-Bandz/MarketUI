import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { Product } from '../../model/product';
import { AuthService } from '../../service/auth.service';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../service/order.service';
import { OrderRequest } from '../../model/order-request';
import { Order } from '../../model/order';

@Component({
  selector: 'app-product-presentation',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './product-presentation.component.html',
  styleUrl: './product-presentation.component.css'
})
export class ProductPresentationComponent implements OnInit {

  productId!: number;
  product: Product | undefined;
  isAdminRole: boolean = false;
  orderQuantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private authService: AuthService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.getProductById(this.productId);
    this.isAdminRole = this.authService.hasRole('ADMIN');
  }

  deleteProductById(id: number) {
    if (confirm("Do you want delete?")) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.router.navigate(['/products'])
      }, (err: any) => {
        console.error('Error delete product!');
      })
    }
  }

  orderProduct() {
    const orderRequest: OrderRequest = {
      productId: this.productId,
      quantity: this.orderQuantity
    };

    this.orderService.createOrder(orderRequest).subscribe((order: Order) => {
      alert(
        'Id:  ' + order.orderId + 
        '\nOwner: ' + order.ownerEmail + 
        '\nPrice: $' + order.price +
        '\nStatus: ' + order.status
      );
      this.getProductById(this.productId);
    }, (err: any) => {
      console.error('Order error!');
    })
  }

  getProductById(id: number) {
    this.productService.getProductById(id).subscribe((res: any) => {
      this.product = res;
    })
  }
}
