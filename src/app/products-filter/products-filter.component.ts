import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.scss']
})
export class ProductsFilterComponent implements OnInit {
  @Input() categories: Array<string>;
  @Output() categorySelected = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  onCategoryChange(selected: string) {
    this.categorySelected.emit(selected);
  }
  
}
