import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IProduct } from '../product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Location } from '@angular/common';
//*** Using FormBuilder
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss'],
})
export class AdminProductComponent implements OnInit {
  product?: IProduct;
  productId?: number;
  pageTitle:string = 'Prodct';

  idOrNew: string;

  productForm = new FormGroup({
    id: new FormControl(),
    title: new FormControl(''),
    price: new FormControl(),
    description: new FormControl(''),
    category: new FormControl(''),
    image: new FormControl(''),
  });

  userFb = this.fb.group({
    id: [],
    name: ['', [Validators.required, Validators.minLength(2)]],
    address: this.fb.group({
      street: [''],
      city: [''],
    }),
  });

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private location: Location,
    //*** Using FormBuilder
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.getProduct();
    });
  }

  getProduct() {
    this.productId = +this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.productService.getProduct(this.productId).subscribe((product) => {
        this.product = product;
        this.pageTitle = `Edit Product ${this.product.id}`;
        // this.productForm.controls['title'].setValue(product.title);
        // this.productForm.controls['price'].setValue(product.price);
        // this.productForm.controls['description'].setValue(product.description);
        // this.productForm.controls['category'].setValue(product.category);
        // this.productForm.controls['image'].setValue(product.image);
        this.productForm.patchValue({id: product.id,
          title: product.title, 
          price: product.price, 
          description: product.description, 
          category: product.category, 
          image: product.image
        });
      });
    }
    else {
      this.pageTitle = 'Add Product';
    }
  }

  onSubmit() {
    if (this.productId) {
      this.productService.updateProduct(this.productForm.value).subscribe((product) => {
        console.log(`Edited: product: ${this.productForm.value.title}`);
        this.goBack();
      });;
    }
    else {
      this.productService.addProduct(this.productForm.value).subscribe(product => {
        console.log(`Added: product: ${this.productForm.value.title}`);
        this.goBack();
      });
    }
  }

  //Programatically partial update of the object (e.g: from the server)
  updatePrice() {
    this.productForm.patchValue({
      price: '100',
      // address: {
      //   street: '123 Drew Street'
      // }
    });
  }

  goBack() {
    this.location.back();
  }
}
