import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from '../product';
import { ProductService } from '../product.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  @Input() product?: IProduct;
  constructor(public router: Router, private location: Location, private productService: ProductService) { }

  ngOnInit(): void {

  }

  deleteProduct(productId:number) {
    if(confirm(`Are you sure to delete product number ${productId}?`)) {
      this.productService.deleteProduct(productId).subscribe(ret => {
        //console.log(`ret = ${ret}`);
        this.location.back();
      });
    }
  }

}
