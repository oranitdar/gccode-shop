import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
// Passing a new search term directly to the the search method
// after every user keystroke would create an excessive amount of HTTP requests,
// taxing server resources and burning through data plans.
// debounceTime(300) waits until the flow of new string events pauses for 300 milliseconds
// before passing along the latest string. You'll never make requests more frequently than 300ms.
//distinctUntilChanged() ensures that a request is sent only if the filter text changed.
//switchMap() calls the search service for each search term that makes it through debounce() 
//and distinctUntilChanged(). It cancels and discards previous search observables, 
//returning only the latest search service observable.
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { IProduct } from '../product';
import { ProductService } from './../product.service';

@Component({
  selector: 'app-products-search',
  templateUrl: './products-search.component.html',
  styleUrls: ['./products-search.component.scss']
})
export class ProductsSearchComponent implements OnInit {

  public products$: Observable<IProduct[]>;
  private searchTerms = new Subject<string>();

  constructor(private productService: ProductService) { }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.products$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      // With the switchMap operator, every qualifying key event can trigger an HttpClient.get() method call.
      // Even with a 300ms pause between requests, you could have multiple HTTP requests in flight and
      // they may not return in the order sent.
      // switchMap() preserves the original request order while returning only the observable from the 
      // most recent HTTP method call. Results from prior calls are canceled and discarded.
      // Note that cancelling a previous search call, Observable doesn't actually abort a pending HTTP request.
      // Unwanted results are simply discarded before they reach your application code.
      switchMap((term: string) => this.productService.searchProduct(term)),

      

    );
  }
  
}
