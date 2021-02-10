import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-products-sorter',
  templateUrl: './products-sorter.component.html',
  styleUrls: ['./products-sorter.component.scss']
})
export class ProductsSorterComponent implements OnInit {
  
  @Output() sortSelectedOutput = new EventEmitter<string>();

  selectedSortProp?:string;

  constructor() { }

  ngOnInit(): void {
  }

  onSortChange() {
    this.sortSelectedOutput.emit(this.selectedSortProp);
    //this.$emit('sortSelectedOutput',this.selectedSortProp)
  }

}
