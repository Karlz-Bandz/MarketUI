import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../model/product';
import { ProductService } from '../../service/product.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent implements OnInit {

  productForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>(''),
    quantity: new FormControl<number>(1, [Validators.required]),
    price: new FormControl<number>(0, [Validators.required, Validators.min(0)])
  });

  productId!: number;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.getProductById(this.productId);
  }

  public getProductById(id: number) {
    this.productService.getProductById(id).subscribe((res: any) => {
      this.productForm.get('name')?.setValue(res.name);
      this.productForm.get('description')?.setValue(res.description);
      this.productForm.get('quantity')?.setValue(res.quantity);
      this.productForm.get('price')?.setValue(res.price);
    })
  }

  public updateProduct() {

    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const product: Product = this.productForm.value as Product;

    this.productService.updateProduct(this.productId, product).subscribe(() => {
      console.log('Product update success!');
    }, (err: any) => {
      console.error('Update product error!');
    })
  }
}
