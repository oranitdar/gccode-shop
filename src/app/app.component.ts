import { Component } from '@angular/core';
import { IProduct } from './product';
import { PRODUCTS } from './mock-products';
import Utils from '../utils'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title:string = 'gocode-shop/ gccode-shop';

  products:Array<IProduct> = PRODUCTS;

  categories:Array<string> = Object.keys(Utils.groupBy(this.products, 'category'));

  selectedCatgeory?:string = '';

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
