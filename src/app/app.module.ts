import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsFilterComponent } from './products-filter/products-filter.component';
import { MessagesComponent } from './messages/messages.component';
import { ProductsSorterComponent } from './products-sorter/products-sorter.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductDetailsComponent,
    ProductsFilterComponent,
    MessagesComponent,
    ProductsSorterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
