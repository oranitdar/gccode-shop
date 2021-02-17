import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { from } from 'rxjs';
import { ISorter, SortType, SortOrder } from './../sorter';

@Component({
  selector: 'app-products-sorter',
  templateUrl: './products-sorter.component.html',
  styleUrls: ['./products-sorter.component.scss'],
})
export class ProductsSorterComponent implements OnInit {
  @Output() sortSelectedOutput = new EventEmitter<ISorter>();

  //selectedSortProp?:string;
  selectedSortProp?: ISorter;

  sortingOptions: ISorter[] = [
    { field: 'title', type: SortType.STRING, order: SortOrder.ASC },
    { field: 'title', type: SortType.STRING, order: SortOrder.DESC },
    { field: 'price', type: SortType.NUMBER, order: SortOrder.ASC },
    { field: 'price', type: SortType.NUMBER, order: SortOrder.DESC },
  ];

  constructor() {}

  ngOnInit(): void {}

  onSortChange() {
    if (!this.selectedSortProp) {
      return;
    }
    // const selectedSorter:ISorter = {field: 'title', type: SortType.STRING, order: SortOrder.ASC};
    // if (this.selectedSortProp?.includes('Price')) {
    this.sortSelectedOutput.emit(this.selectedSortProp);
    //this.$emit('sortSelectedOutput',this.selectedSortProp)
  }
}
