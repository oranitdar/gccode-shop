import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { MessageService } from './message.service'
import Utils from '../utils'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title:string = 'gocode-shop/ gccode-shop';

  products?:IProduct[];

  categories:string[] = [];

  selectedCatgeory?:string = '';

  constructor (private productService:ProductService, public messageService:MessageService) {
    
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.categories = Object.keys(Utils.groupBy(products, 'category'));
    });
    
  }

  onToggle() {
    this.title = this.title ? '' : 'gocode-shop';
  }

  changeTitle(e: any) {
    this.title = (<HTMLInputElement>e.target).value;
  }

  onCategoryChange(selected:string) {
    this.selectedCatgeory = selected;
  }
}
