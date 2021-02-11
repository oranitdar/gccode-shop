import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { from } from 'rxjs';
import { ISorter, SortType, SortOrder } from './../sorter'

@Component({
  selector: 'app-products-sorter',
  templateUrl: './products-sorter.component.html',
  styleUrls: ['./products-sorter.component.scss']
})
export class ProductsSorterComponent implements OnInit {
  
  @Output() sortSelectedOutput = new EventEmitter<ISorter>();

  selectedSortProp?:string;

  constructor() { }

  ngOnInit(): void {
  }

  onSortChange() {
    if (!this.selectedSortProp) {
      return;
    }
    const selectedSorter:ISorter = {field: 'title', type: SortType.STRING, order: SortOrder.ASC};
    if (this.selectedSortProp?.includes('Price')) {
      selectedSorter.field = 'price';
      selectedSorter.type = SortType.NUMBER;
    }
    if (this.selectedSortProp?.includes('Desc')) {
      selectedSorter.order = SortOrder.DESC;
    }
    this.sortSelectedOutput.emit(selectedSorter);
    //this.$emit('sortSelectedOutput',this.selectedSortProp)
  }

}
