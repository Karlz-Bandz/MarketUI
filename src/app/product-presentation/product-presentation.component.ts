import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { Product } from '../../model/product';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-product-presentation',
  standalone: true,
  imports: [],
  templateUrl: './product-presentation.component.html',
  styleUrl: './product-presentation.component.css'
})
export class ProductPresentationComponent implements OnInit {

  productId: number | null = null;
  product: Product | undefined;
  isAdminRole: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private authService: AuthService
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

  getProductById(id: number) {
    this.productService.getProductById(id).subscribe((res: any) => {
      this.product = res;
    })
  }
}
