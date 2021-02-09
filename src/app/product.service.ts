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

  getProducts(): Observable<IProduct[]> {
    this.messageService.add(`ProductService | getProducts | fetched ${PRODUCTS.length} products`);
    return of(PRODUCTS);
  }

}
