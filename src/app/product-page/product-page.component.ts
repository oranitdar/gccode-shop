import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from '../product';
import { ProductService } from './../product.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  
  constructor(private productService:ProductService,
    private route: ActivatedRoute,
    private location: Location) { 

  }

  product?:IProduct;

  ngOnInit(): void {
    // this.getProduct();
    this.route.params.subscribe(param => {
      this.getProduct();
    });
  }

  

  getProduct() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(id).subscribe(product => this.product = product);
  }

  goBack() {
    this.location.back();
  }
}
