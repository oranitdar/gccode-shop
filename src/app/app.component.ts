import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  @ViewChild("messages") messagesView: ElementRef;

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

  onSortChange(sortCode:string) {
    if (this.products) {
      if (sortCode == 'NameAsc') {
        this.products.sort((a, b) => a.title.localeCompare(b.title));
      }
      else if (sortCode == 'NameDesc') {
        this.products.sort((a, b) => b.title.localeCompare(a.title));
      }
      else if (sortCode == 'PriceAsc') {
        this.products.sort((a, b) => { return a.price - b.price});
      }
      else if (sortCode == 'PriceDesc') {
        this.products.sort((a, b) => { return b.price - a.price});
      }
    }
  }

  onProductSelected(product:IProduct) {
    this.messageService.add('Product selected: ' + product.title)
    //this.messagesView.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // ngAfterViewInit() {
  //   this.messagesView.nativeElement.scollToView();
  // }
}
