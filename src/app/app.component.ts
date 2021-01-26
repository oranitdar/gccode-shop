import { Component } from '@angular/core';
import { IProduct } from './product';
import { PRODUCTS } from './mock-products';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title:string = 'gocode-shop/ gccode';

  product:Array<IProduct> = PRODUCTS;

  onToggle() {
    this.title = this.title ? '' : 'gocode-shop';
  }
  changeTitle(e: any) {
    this.title = (<HTMLInputElement>e.target).value;
  }

}
