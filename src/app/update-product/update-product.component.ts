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

  selectedFile?: File;

  productForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>(''),
    quantity: new FormControl<number>(1, [Validators.required]),
    price: new FormControl<number>(0, [Validators.required, Validators.min(0)])
  });

  productId!: number;
  imageUrl: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.getProductById(this.productId);
    this.getImage(this.productId);
  }

  public onFileSelected(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }

  }

  public getImage(id: number) {
    this.productService.getImage(id).subscribe(blob => {
      this.imageUrl = URL.createObjectURL(blob);
    }, (err: any) => {
      console.error("Image not exists!")
    });
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

    this.productService.updateProduct(this.productId, product).subscribe({

      next: () => {

        if (this.selectedFile) {

          this.productService
            .uploadProductImage(this.productId, this.selectedFile)
            .subscribe({

              next: () => {
                console.log("Product and image updated!");
              },

              error: () => {
                console.error("Image upload failed!");
              }

            });

        } else {
          console.log("Product updated!");
        }

      },

      error: () => {
        console.error("Product update failed!");
      }

    });

  }
  
}
