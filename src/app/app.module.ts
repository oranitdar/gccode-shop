import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsFilterComponent } from './products-filter/products-filter.component';
import { MessagesComponent } from './messages/messages.component';
import { ProductsSorterComponent } from './products-sorter/products-sorter.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { ProductsSearchComponent } from './products-search/products-search.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductDetailsComponent,
    ProductsFilterComponent,
    MessagesComponent,
    ProductsSorterComponent,
    ProductPageComponent,
    MainPageComponent,
    ProductsSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
