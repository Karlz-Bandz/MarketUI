import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../service/product.service';
import { Product } from '../../model/product';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {

  constructor(private productService: ProductService) {}

  productForm = new FormGroup({
      name: new FormControl<string>('', [Validators.required]),
      description: new FormControl<string>(''),
      quantity: new FormControl<number>(1, [Validators.required]),
      price: new FormControl<number>(0, [Validators.required, Validators.min(0)])
  });

  public addProduct() {

    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const product: Product = this.productForm.value as Product;

    this.productService.createProduct(product).subscribe(() => {
      console.log('Product added!');
    }, (err: any) => {
      console.error('Product add error!')
    })
  }
}
