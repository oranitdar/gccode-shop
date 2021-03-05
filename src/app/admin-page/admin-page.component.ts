import { Component, OnInit } from '@angular/core';
import { IProduct } from '../product';
import { ProductService } from './../product.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  products?:IProduct[];

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

}
