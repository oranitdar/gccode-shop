import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsSorterComponent } from './products-sorter.component';

describe('ProductsSorterComponent', () => {
  let component: ProductsSorterComponent;
  let fixture: ComponentFixture<ProductsSorterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsSorterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsSorterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
