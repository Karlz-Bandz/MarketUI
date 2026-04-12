import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  loading = false;
  hasRoleAdmin: boolean = false;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadProducts();
    this.hasRoleAdmin = this.authService.hasRole('ADMIN');
  }

  goToProduct(id: number) {
    this.router.navigate(['/product', id]);
  }

  deleteProductById(id: number) {

    if (confirm("Do you want delete?")) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.loadProducts();
      }, (err: any) => {
        console.error('Error delete product!');
      })
    }
  }

  loadProducts() {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Błąd ładowania produktów:', err);
        this.loading = false;
        if (err.status === 401) {
          this.router.navigate(['/login']);
        }
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
