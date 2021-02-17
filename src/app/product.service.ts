import { Injectable } from '@angular/core';
import { IProduct } from './product';
import { PRODUCTS } from './mock-products';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private messageService:MessageService) { 

  }

  getProduct(id:number): Observable<IProduct> {
    this.messageService.add(`ProductService | getProduct By id = ${id}`);
    return of(<IProduct>PRODUCTS.find(product => product.id === id));
  }

  getProducts(): Observable<IProduct[]> {
    this.messageService.add(`ProductService | getProducts | fetched ${PRODUCTS.length} products`);
    return of(PRODUCTS);
  }

}
