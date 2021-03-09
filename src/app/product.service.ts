import { Injectable } from '@angular/core';
import { IProduct } from './product';
import { PRODUCTS } from './mock-products';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { RecursiveTemplateAstVisitor } from '@angular/compiler';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private messageService:MessageService, private http: HttpClient) { 

  }

  private productsUrl = 'api/products';

  //The web API expects a special header in HTTP save requests:  
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };  

  private productsList:IProduct[] = [];

  public get ProductsList() : IProduct[] {
    return this.productsList;
  }
  public set ProductsList(value : IProduct[]) {
    this.productsList = value;
  } 

  private getNextProductId():number {
    return (Math.max.apply(Math, this.ProductsList.map(function(o) { return o.id; }))) + 1;
  }

  /** Log a ProductService message with the MessageService **/
  private log(message: string) {
    this.messageService.add(`ProductService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  
  /** GET product by id. Will 404 if id not found */
  getProduct(id:number): Observable<IProduct> {
    // return of(<IProduct>PRODUCTS.find(product => product.id === id));
    const url = `${this.productsUrl}/${id}`;
    //Pipe = take actions before subscribing is performed
    return this.http.get<IProduct>(url).pipe(
      tap(_ => this.log(`getProduct By id | id = ${id}`)),
      catchError(this.handleError<IProduct>(`getProduct id=${id}`))
    );
  }

  getProducts(): Observable<IProduct[]> {
    if (this.ProductsList.length == 0) {
      return this.http.get<IProduct[]>(this.productsUrl).pipe(
        //_ means that there are params, but we are not interested in them
        //tap - before the client of the server subscribes, called whenever the service is consumed
        //actions written here will be taking whenever any consumer calls the service
        tap(serviceProducts => {
          this.log(`getProducts | fetched ${PRODUCTS.length} products`);
          this.ProductsList = serviceProducts;
        }),
        catchError(this.handleError<IProduct[]>('getProducts', []))
      );
    }
    else {
      return of (this.ProductsList);
    }
  }

  //Using http.put() to persist the changed hero on the server
  updateProduct(product: IProduct): Observable<any> {
    //In real life - put inside the pipe
    let itemIndex = this.ProductsList.findIndex(item => item.id == product.id);
    this.ProductsList[itemIndex] = product;
    return this.http.put(this.productsUrl, product, this.httpOptions).pipe(
      tap(_ => {
        this.log(`updateProduct | updated product  id=${product.id}`);
      }),
      catchError(this.handleError<any>('updateProduct'))
    );  
  }

  addProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.productsUrl, product, this.httpOptions).pipe(
      tap((newProduct:IProduct) => {
        this.log(`addProduct | added product w/ id=${newProduct.id}`);
        product.id = this.getNextProductId();
        this.ProductsList.push(product);
      }),
      catchError(this.handleError<IProduct>('addProduct'))
    );
  }

  deleteProduct(product: IProduct | number): Observable<IProduct> {
    const id = typeof product === 'number' ? product : product.id;
    const url = `${this.productsUrl}/${id}`;
    return this.http.delete<IProduct>(url, this.httpOptions).pipe(
      tap(_ => {
        this.log(`deleteProduct | deleted product id = ${id}`);
        this.ProductsList = this.ProductsList.filter(obj => obj.id !== id);
      }),
      catchError(this.handleError<IProduct>('deleteProduct'))
    );
  }

  searchProduct(term: string): Observable<IProduct[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array (use of since we return an observable)
      return of([]);
    }
    return this.http.get<IProduct[]>(`${this.productsUrl}/?title=${term}`).pipe(
      tap(x => x.length ?
        this.log(`searchProduct | found ${x.length} products matching "${term}"`) :
        this.log(`no products matching "${term}" were found`)),
      catchError(this.handleError<IProduct[]>('searchProduct', []))
    );
  }
}
